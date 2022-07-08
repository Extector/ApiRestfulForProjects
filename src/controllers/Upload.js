import multer from 'multer';
import multerConfig from '../config/multer';

import Upload from '../models/Upload';

const upload = multer(multerConfig).single('file');

class UploadController {
  store(req, res) {
    upload(req, res, async (e) => {
      if (e) return res.status(400).json({ message: e.code });

      try {
        const { originalname, filename } = req.file;

        // eslint-disable-next-line camelcase
        const { aluno_id } = req.body;
        // eslint-disable-next-line camelcase
        const image = await Upload.create({ originalname, filename, aluno_id });

        return res.json({ image });
      } catch (error) {
        return res.status(404).json({ message: 'User does not exist' });
      }
    });
  }
}

export default new UploadController();
