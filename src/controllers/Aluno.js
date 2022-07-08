import Aluno from '../models/Aluno';
import Upload from '../models/Upload';

class AlunoController {
  async index(req, res) {
    const aluno = await Aluno.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'age', 'height', 'weight'],
      order: [
        ['id', 'DESC'],
        [Upload, 'id', 'DESC'],
      ],
      include: {
        model: Upload,
        attributes: ['url', 'filename'],
      },
    });
    res.json(aluno);
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(404).json(null);

      const newAluno = await Aluno.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        height: req.body.height,
        weight: req.body.weight,
      });

      if (!newAluno) {
        return res
          .status(404)
          .json({ message: 'Invalid parameters, try again' });
      }

      const {
        id, firstName, lastName, email, age, height, weight,
      } = newAluno;

      return res.json({
        message: 'Aluno successfully created',
        name: `${firstName} ${lastName}`,
        id,
        age,
        email,
        height,
        weight,
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async show(req, res) {
    try {
      if (!req.params.id) return res.status(404).json({ message: 'No id provided' });
      const aluno = await Aluno.findByPk(req.params.id, {
        attributes: ['firstName', 'lastName', 'email', 'age', 'height', 'weight'],
        order: [
          ['id', 'DESC'],
          [Upload, 'id', 'DESC'],
        ],
        include: {
          model: Upload,
          attributes: ['url', 'filename'],
        },
      });

      if (!aluno) return res.status(404).json({ message: 'No Aluno found' });

      return res.status(200).json({ aluno });
    } catch (error) {
      return res.status(500).json({ message: 'Invalid request' });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) return res.status(404).json({ message: 'No id provided' });
      const aluno = Aluno.findOne({ email: req.params.id });

      if (!aluno) return res.status(404).json({ message: 'No aluno found' });

      const newAluno = await aluno.update(req.body);
      const {
        id, firstName, lastName, email, age, height, weight,
      } = newAluno;

      return res.status(200).json({
        message: 'Aluno successfully updated',
        id,
        name: `${firstName} ${lastName}`,
        email,
        age,
        height,
        weight,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Invalid request' });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) return res.status(404).json({ message: 'Request id required' });
      const aluno = await Aluno.findOne({ email: req.params.id });

      if (!aluno) return res.status(404).json({ message: 'No Aluno found' });

      aluno.destroy();
      return res.status(200).json({ message: 'Aluno successfully deleted' });
    } catch (error) {
      return res.status(500).json({ message: 'Invalid request' });
    }
  }
}

export default new AlunoController();
