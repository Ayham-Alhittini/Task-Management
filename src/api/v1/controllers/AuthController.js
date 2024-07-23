import 'dotenv/config';
import userService from '../services/UserService.js';
import authService from '../services/AuthService.js';

class AuthController {
    async signUp(req, res) {
        const newUser = req.body;
        await userService.createUser(newUser);
        res.status(201).send({ message: 'User created successfully' });
    }

    async login(req, res) {
        const { email, password } = req.body;
        const credentials = await authService.authenticateUser(email, password);
        if (!credentials) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }
        res.send(credentials);
    }

    async logout(req, res) {
        const userId = req.user.userId;
        const { refreshToken } = req.body;
        const result = await authService.logoutUser(userId, refreshToken);
        if (!result) {
            return res.status(403).send('You are not logged in');
        }
        res.send('Logged out successfully');
    }

    async generateAccessToken(req, res) {
        const { refreshToken } = req.body;
        const newAccessToken = await authService.generateAccessTokenFromRefreshToken(refreshToken);
        if (!newAccessToken) {
            return res.status(403).send('Invalid refresh token');
        }
        res.send({ accessToken: newAccessToken });
    }
}

export default new AuthController();
