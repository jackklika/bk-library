import express from 'express';

import { SECRET_KEY, create_auth_token, create_signup_token, generateToken, login_challenge, signup_challenge } from '../logic/auth';
import { createUser } from '../logic/user';

import { TwilioMock } from '../sms/twilioMock';

import jwt from 'jsonwebtoken';
import { SignupToken } from '../db/models/signupToken';

const twilio_client = new TwilioMock()

const authRouter = express.Router();

authRouter.post('/api/auth/signup', async (req, res) => {
    try {
        const { phone_number } = req.body;

        if (!phone_number) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        const signup_token = await create_signup_token(phone_number)

        twilio_client.messages.send({
            body: `Enter this code on the pinpad: ${signup_token.otp_code}`,
            to: phone_number
        })

        res.status(201).json({ message: 'Check your phone' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while signing up' });
    }
});

authRouter.post('/api/auth/register', async (req, res) => {
    /*
    Given a valid signup token, create the user
    */
    try {
        const { phone_number, username, otp_code} = req.body;

        if (!phone_number || !otp_code || !username) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        const result = await signup_challenge(phone_number, otp_code);

        if (result.success) {
            const user = await createUser(username, phone_number)
            const token = await generateToken(user.id)
            res.status(200).json({ token: token });
        } else {
            res.status(400).json({ error: 'Incorrect OTP code or token expired' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while signing up' });
    }
});

authRouter.post('/api/auth/create_auth_token', async (req, res) => {
    /*
    Create signup auth token to be used to authenticate soon
    */
    try {
        const { phone_number } = req.body;

        if (!phone_number) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        const result = await create_auth_token(phone_number);

        if (result.success) {
            return res.status(200).json("Check your phone");
        } else {
            return res.status(500).json({ error: result.error });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating auth token' });
    }

})

authRouter.post('/api/auth/login', async (req, res) => {
    /*
    Use otp_code and phone_number to auth
    */
    try {
        const { phone_number, otp_code } = req.body;

        const result = await login_challenge(phone_number, otp_code);
        if (result.error) {
            return res.status(401).json({ error: result.error });
        }

        res.status(200).json({ token: result.token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
});

export default authRouter;