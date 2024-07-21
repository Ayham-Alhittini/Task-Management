import 'dotenv/config';
import userService from '../services/UserService.js';
import authService from '../services/AuthService.js';

class AuthController {
    async signUp(req, res) {
        const newUser = req.body;
        await userService.createUser(newUser);
        res.status(201).send('Go and confirm your email');
    }

    async login(req, res) {
        const { email, password } = req.body;

        const user = await userService.findUserByEmail(email);
        if (!user) { return res.status(401).send('Invalid credentials'); }

        const isMatch = await authService.comparePassword(password, user.password);
        if (!isMatch) { return res.status(401).send('Invalid credentials'); }

        const userId = user._id;
        const credentials = {
            accessToken: authService.generateAccessToken(userId),
            refreshToken: authService.generateRefreshToken(userId)
        };
        await authService.saveRefreshToken(userId, credentials.refreshToken);
        res.send(credentials);
    }

    async logout(req, res) {
        const userId = req.user.userId;
        const { refreshToken } = req.body;
        const result = await authService.removeRefreshToken(userId, refreshToken);
        if (!result) { return res.status(403).send('You are not logged in'); }
        res.send('Logged out successfully');
    }

    async generateAccessToken(req, res) {
        const { refreshToken } = req.body;
        const newAccessToken = await authService.generateAccessTokenFromRefreshToken(refreshToken);
        if (!newAccessToken) { return res.status(403).send('Invalid refresh token'); }
        res.send({ accessToken: newAccessToken });
    }
}

export default new AuthController();
