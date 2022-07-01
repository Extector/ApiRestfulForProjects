import Aluno from '../models/Aluno';

class Home {
  async index(req, res) {
    const newAluno = await Aluno.create({
      firstName: 'Luis Gustavo',
      lastName: 'Campos',
      email: 'luis.gustavo@gmail.com',
      age: 18,
      height: 1.8,
      weight: 83.5,
    });

    res.json({ newAluno });
  }
}

export default new Home();
