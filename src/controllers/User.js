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
      res.json(newUser);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  }

  // Index
  async index(req, res) {
    try {
      const users = await User.findAll(req.params.id);
      if (!users) return res.status(404).json({ message: 'No users found' });
      const { id, email } = users;
      return res.json({ id, email });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  // Show
  async show(req, res) {
    try {
      if (!req.params.id && typeof req.params.id !== 'number') {
        return res
          .status(404)
          .json({ message: 'ID not provided / ID does not exists' });
      }

      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const { id, email } = user;
      return res.json({ id, email });
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
      return res.json(updatedUser);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.UserId);
      if (!user) {
        return res.status(404).json({ message: 'User does not exist' });
      }

      await user.destroy();
      return res.status(200).json({ message: 'User has been deleted' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new UserController();
