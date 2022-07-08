import User from '../models/User';

class UserController {
  // Create
  async store(req, res) {
    try {
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      const { username, email } = newUser;

      res.json({
        message: 'User successfully created', username, email,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  }

  // Index
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'username', 'email'] });
      if (!users) return res.status(404).json({ message: 'No users found' });
      return res.json(users);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  // Show
  async show(req, res) {
    try {
      const user = await User.findByPk(req.UserId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const { id, username, email } = user;
      return res.json({ id, username, email });
    } catch (error) {
      return res.status(404).json({ message: 'No user found' });
    }
  }

  // Update
  async update(req, res) {
    try {
      const user = await User.findByPk(req.UserId);
      if (!user) {
        return res.status(404).json({ message: ' User does not exist' });
      }

      const updatedUser = await user.update(req.body);
      const { id, username, email } = updatedUser;
      return res.json({
        message: 'User Successfully updated', id, username, email,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.UserId);
      if (!user) return res.status(404).json({ message: 'User does not exist', user });

      await user.destroy();
      return res.status(200).json({ message: 'User has been deleted' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new UserController();
