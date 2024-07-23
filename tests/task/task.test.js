import request from 'supertest';
import app from '../../src/app.js';
import { describe, it, expect, beforeAll } from '@jest/globals';
import userService from '../../src/api/v1/services/UserService.js';

describe('Task Requests', () => {
    let accessToken;
    let taskId;

    const user = { 
        firstName: 'Task Test User First Name', 
        lastName: 'Task Test User Last Name', 
        email: 'task.test.user@email.com', 
        password: 'Pa$$w0rd' 
    };

    beforeAll(async() => {
    // Log in to get access token

        const isUserExists = await userService.findUserByEmail(user.email);
        if (!isUserExists) {
            await request(app)
                .post('/auth/singUp')
                .send(user);
        }

        const loginResponse = await request(app)
            .post('/auth/login')
            .send({
                email: user.email,
                password: user.password
            });
        accessToken = loginResponse.body.accessToken;
    });

    it('should create a new task', async() => {
        const response = await request(app)
            .post('/task/create')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                taskTitle: 'Task3',
                taskDescription: 'Task3 description ....'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('task');
        taskId = response.body.task._id;
    });

    it('should get tasks with specified priority', async() => {
        const response = await request(app)
            .get('/task/get?taskPriority=Regular')
            .set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('tasks');
    });

    it('should update the task', async() => {
        const response = await request(app)
            .patch(`/task/update/${taskId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                isTaskCompleted: true,
                taskDueDate: '2024-07-23',
                taskPriority: 'High'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('task');
    });

    it('should delete the task', async() => {
        const response = await request(app)
            .delete(`/task/delete/${taskId}`)
            .set('Authorization', `Bearer ${accessToken}`);
        expect(response.statusCode).toBe(204);
    });
});
