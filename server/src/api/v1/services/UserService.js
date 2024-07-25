import UserModel from '../models/User.js';

class UserService {
    createUser(user) {
        const newUser = new UserModel({ ...user });
        return newUser.save();
    }

    findUserByEmail(email) {
        return UserModel.findOne({ email });
    }

    getTotalUsersCount() {
        return UserModel.countDocuments();
    }
}

export default new UserService();
