import request from 'supertest';
import app from '../../src/app.js';
import { describe, it, expect, beforeAll } from '@jest/globals';
import userService from '../../src/api/v1/services/UserService.js';

describe('Auth Requests', () => {
    let accessToken;
    let refreshToken;

    const user = { firstName: null, lastName: null, email: null, password: null };

    beforeAll(async() => {
        const userNumber = await userService.getTotalUsersCount() + 1;

        user.firstName = `firstName#${userNumber}`;
        user.lastName = `lastName#${userNumber}`;
        user.email = `user${userNumber}@gmail.com`;
        user.password = 'Pa$$w0rd';
    });

    it('should sign up a new user', async() => {
        const response = await request(app)
            .post('/auth/singUp')
            .send(user);
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'User created successfully');
    });

    it('should log in an existing user', async() => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                email: user.email,
                password: user.password
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('credentials.accessToken');
        expect(response.body).toHaveProperty('credentials.refreshToken');
        accessToken = response.body.credentials.accessToken;
        refreshToken = response.body.credentials.refreshToken;
    });

    it('should generate a new access token', async() => {
        const response = await request(app)
            .post('/auth/generateAccessToken')
            .send({
                refreshToken
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('accessToken');
        accessToken = response.body.accessToken;
    });

    it('should log out the user', async() => {
        const response = await request(app)
            .delete('/auth/logout')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                refreshToken: refreshToken
            });
        expect(response.statusCode).toBe(200);
    });
});
