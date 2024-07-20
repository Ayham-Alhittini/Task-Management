import 'dotenv/config';
import userService from '../services/UserService.js';
import authService from '../services/AuthService.js';

class AuthController {

  async signUp(req, res) {
    const newUser = req.body;
    const savedUser = await userService.createUser(newUser);
    res.status(201).send(savedUser);
  }
  
  async login(req, res) {
    const { email, password } = req.body;

    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(401).send('Invalid credentials1');
    }

    const isMatch = await authService.comparePassword(password, user.password);

    if (isMatch) {
      res.send('Successful');
    } else {
      res.status(401).send('Invalid credentials2');
    }
  }

}

export default new AuthController();
