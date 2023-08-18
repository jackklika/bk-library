import { SignupToken } from "../db/models/signupToken";

async function signup_challenge(phone_number: string, otp_code: string): Promise<{ success: boolean, error?: string, retries?: number }> {
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
        return {success: true}
    }
    
}