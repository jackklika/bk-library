import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../logic/auth';

import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
    user_id?: string;
}

export function authenticate(req: any, res: any, next: any) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; 

    jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => { 
        if (err) {
            return res.status(401).json({ error: 'Failed to authenticate token' });
        }
        req.user_id = decoded.user_id; 
        next();
    });
}
