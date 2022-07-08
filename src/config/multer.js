import multer, { MulterError } from 'multer';
import { extname, resolve } from 'path';

const random = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg') {
      return cb(new MulterError(`Unexpected File type ${file.mimetype}. File type needs to be an image`));
    }

    return cb(null, true);
  },

  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Math.floor(Date.now() / (60 * 2))}_${random()}${extname(file.originalname)}`);
    },
  }),
};
