import 'dotenv/config';
import userService from '../services/UserService.js';
import authService from '../services/AuthService.js';
import jwt from 'jsonwebtoken';

class AuthController {
    async signUp(req, res) {
        const newUser = req.body;
        await userService.createUser(newUser);
        res.status(201).send('Go and confirm your email');
    }

    async login(req, res) {
        const { email, password } = req.body;

        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(401).send('Invalid credentials');
        }

        const isMatch = await authService.comparePassword(password, user.password);

        if (isMatch) {
            const userId = user._id;
            const credentials = {
                accessToken: authService.generateAccessToken(userId),
                refreshToken: authService.generateRefreshToken(userId)
            };
            authService.saveRefreshToken(userId, credentials.refreshToken);
            res.send(credentials);
        } else {
            res.status(401).send('Invalid credentials');
        }
    }

    async generateAccessToken(req, res) {
        const { refreshToken } = req.body;

        if (!(await authService.getRefreshToken(refreshToken))) { return res.status(403).send(); }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) { return res.sendStatus(403); }
            return res.send({
                accessToken: authService.generateAccessToken(user.userId)
            });
        });
    }

    async logout(req, res) {
        const userId = req.user.userId;
        const refreshToken = req.body.refreshToken;
        const user = await authService.removeRefreshToken(userId, refreshToken);
        if (!user) { return res.status(403).send({ error: 'Your not logged in' }); }
        res.send();
    }
}

export default new AuthController();
