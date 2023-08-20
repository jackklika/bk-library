import jwt from 'jsonwebtoken'; // assuming JWT for token validation

const SECRET_KEY = "test_token"

export function authenticate(req: any, res: any, next: any) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => { 
        if (err) {
            return res.status(401).json({ error: 'Failed to authenticate token' });
        }
        req.user_id = decoded.id; 
        next();
    });
}
