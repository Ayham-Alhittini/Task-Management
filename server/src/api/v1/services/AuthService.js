import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import RefreshToken from '../models/RefreshToken.js';

class AuthService {
    async authenticateUser(user, enteredPassword) {
        const isMatch = await this.comparePassword(enteredPassword, user.password);
        if (!isMatch) { return null; }

        const userId = user._id;
        const credentials = {
            accessToken: this.generateAccessToken(userId),
            refreshToken: this.generateRefreshToken(userId)
        };
        await this.saveRefreshToken(userId, credentials.refreshToken);
        return credentials;
    }

    async logoutUser(userId, refreshToken) {
        return this.removeRefreshToken(userId, refreshToken);
    }

    async comparePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    async saveRefreshToken(userId, refreshToken) {
        const newRefreshToken = new RefreshToken({ userId, token: refreshToken });
        await newRefreshToken.save();
    }

    async removeRefreshToken(userId, refreshToken) {
        return await RefreshToken.findOneAndDelete({ userId, token: refreshToken });
    }

    async getRefreshToken(refreshToken) {
        return await RefreshToken.findOne({ token: refreshToken });
    }

    generateAccessToken(userId) {
        return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1H' });
    }

    generateRefreshToken(userId) {
        return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '10d' });
    }

    async generateAccessTokenFromRefreshToken(refreshToken) {
        const storedRefreshToken = await this.getRefreshToken(refreshToken);
        if (!storedRefreshToken) {
            return null;
        }

        const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        return this.generateAccessToken(user.userId);
    }
}

export default new AuthService();
