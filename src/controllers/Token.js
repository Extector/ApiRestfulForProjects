import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    if (!req.body) {
      return res.status(404).send({ message: 'Error creating  token' });
    }

    const { email = '', password = '' } = req.body;
    if (!email || !password) {
      return res.status(404).send({ message: 'No email or password provided' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (!(await user.passwordIsValid(password))) return res.status(404).send({ message: 'Password is invalid' });

    const { id } = user;
    const token = jwt.sign({ email, id }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ message: 'Token gerado com sucesso', token });
  }
}

export default new TokenController();
