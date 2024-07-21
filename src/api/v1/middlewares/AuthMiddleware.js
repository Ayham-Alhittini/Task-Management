import 'dotenv/config';
import jwt from 'jsonwebtoken';

function authenticationMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) { return res.status(401).send({ message: 'Token is missing' }); }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) { return res.status(403).send({ message: 'Invalid Token' }); }
        req.user = user;
        next();
    });
}

export default authenticationMiddleware;
