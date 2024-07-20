import UserModel from '../models/User.js';

class UserService {
    async createUser(user) {
        const newUser = new UserModel({ ...user });
        return await newUser.save();
    }

    async findUserByEmail(email) {
        return await UserModel.findOne({ email });
    }
}

export default new UserService();
