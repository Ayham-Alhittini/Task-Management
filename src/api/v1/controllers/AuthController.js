import 'dotenv/config';
import userService from '../services/UserService.js';
import authService from '../services/AuthService.js';

class AuthController {

  async signUp(req, res) {
    const { username, password } = req.body;

    if (!authService.validatePasswordStrength(password)) {
      return res.status(400).send('Password does not meet strength criteria');
    }

    const savedUser = await userService.createUser(username, password);
    res.status(201).send(savedUser);
  }
  
  async login(req, res) {
    const { username, password } = req.body;

    const user = await userService.findUserByUsername(username);
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    const isMatch = await authService.comparePassword(password, user.password);

    if (isMatch) {
      res.send('Successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  }

}

export default new AuthController();
