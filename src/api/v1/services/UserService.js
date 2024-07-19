import UserModel from '../models/UserModel.js';

class UserService {

  async createUser(username, password) {
    const user = new UserModel({ username, password });
    return await user.save();
  }

  async findUserByUsername(username) {
    return await UserModel.findOne({ username });
  }

}

export default new UserService();
