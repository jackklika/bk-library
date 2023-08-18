import express from 'express';

import { signup_challenge } from '../logic/auth';

import { TwilioMock } from '../sms/twilioMock';

const twilio_client = new TwilioMock()

const authRouter = express.Router();

authRouter.post('/api/auth/signup', async (req, res) => {
    try {
        const { phone_number } = req.body;

        if (!phone_number) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        const signupToken = await SignupToken.create({phone_number: phone_number});

        twilio_client.messages.send({
            body: `Enter this code on the pinpad: ${signupToken.otp_code}`,
            to: phone_number
        })


        res.status(201).json({ message: 'Check your phone' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while signing up' });
    }
});

authRouter.post('/api/auth/register', async (req, res) => {
    try {
        const { phone_number,  otp_code} = req.body;

        if (!phone_number || !otp_code) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        const result = await signup_challenge(phone_number, otp_code);


        if (result.success) {
            // todo: 
            // - create user 
            // - create auth token
            // - delete signup token
            res.status(200).json({ error: 'Signup successful' });
        } else {
            //await SignupToken.decrementRetries(result.token.id)
            res.status(400).json({ error: 'Incorrect OTP code or token expired' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while signing up' });
    }
});

export default authRouter;