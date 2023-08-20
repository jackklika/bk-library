import { SignupToken } from "../db/models/signupToken";
import { AuthToken } from "../db/models/authToken";
import { User } from "../db/models/user";
import { TwilioMock } from "../sms/twilioMock";

import jwt from 'jsonwebtoken';

export const SECRET_KEY = "test_token"

const twilio_client = new TwilioMock()

export function generateToken(user_id: string): string {
    const payload = { user_id: user_id };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

export async function create_signup_token(phone_number: string): Promise<SignupToken> {
    return await SignupToken.create({phone_number: phone_number});
}

export async function create_auth_token(phone_number: string): Promise<{ success: boolean, error?: string }> {

    const user = await User.getByPhoneNumber(phone_number)
    if (!user) {
        return {success: false, error: "No auth token found for this phone number"}
    }
    const authToken = await AuthToken.create({user_id: user.id});
    twilio_client.messages.send({
        body: `Enter this code on the pinpad: ${authToken.otp_code}`,
        to: phone_number
    })
    return {success: true}
}

export async function signup_challenge(phone_number: string, otp_code: string): Promise<{ success: boolean, error?: string, retries?: number, token?: string}> {
    /*
    Given a code, will attempt to complete the otp_code challenge and will decrement retries on failure
    */

    const result = await SignupToken.getByPhoneNumber(phone_number)

    if (!result) {
        return {success: false, error: "No signup token found for this phone number"}
    } else if (result.otp_code !== otp_code) {
        const decremented = await SignupToken.decrementRetries(phone_number)
        return {success: false, error: "OTP code is incorrect", retries: decremented?.retries} 
    } else if (result.expiry < new Date()) {
        await SignupToken.deleteById(result.id)
        return {success: false, error: "Token expired"}
    } else {
        SignupToken.deleteById(result.id)
        return {success: true, token: generateToken(phone_number)}
    }
    
}

export async function login_challenge(phone_number: string, otp_code: string): Promise<{ success: boolean, error?: string, retries?: number, token?: string}> {
    /*
    Given a phone number and otp_code, will attempt to complete the otp_code challenge and will decrement retries on failure
    */
    const user = await User.getByPhoneNumber(phone_number)
    if (!user) {
        return {success: false, error: "No login token found for this phone number"}
    }
    
    const result = await AuthToken.findByUserId(user.id)

    if (!result) {
        return {success: false, error: "No login token found for this phone number"}
    } else if (result.otp_code !== otp_code) {
        const decremented = await AuthToken.decrementRetries(phone_number)
        return {success: false, error: "OTP code is incorrect", retries: decremented?.retries} 
    } else if (result.expiry < new Date()) {
        await AuthToken.deleteById(result.id)
        return {success: false, error: "Token expired"}
    } else {
        return {success: true, token: generateToken(user.id)}
    }
}

