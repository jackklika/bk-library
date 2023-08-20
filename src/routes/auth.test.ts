import request from 'supertest';
import express from 'express';
import authRouter from './auth'; // Path to your router file

import crypto from 'crypto'

const app = express();
app.use(express.json());
app.use(authRouter);



describe('AuthRouter', () => {
    it('should be able to hit auth signup endpoint', async () => {

        // We aren't doing any phone number validation right now so this works!
        const phone_number = '262-751-2483' + crypto.randomBytes(8).toString("hex");;

        const res = await request(app)
            .post('/api/auth/signup')
            .send({ phone_number });
        expect(res.statusCode).toEqual(201);
    });
});
