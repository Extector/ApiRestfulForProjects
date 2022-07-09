"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('../config/multer'); var _multer4 = _interopRequireDefault(_multer3);

var _Upload = require('../models/Upload'); var _Upload2 = _interopRequireDefault(_Upload);

const upload = _multer2.default.call(void 0, _multer4.default).single('file');

class UploadController {
  store(req, res) {
    upload(req, res, async (e) => {
      if (e) return res.status(400).json({ message: e.code });

      try {
        const { originalname, filename } = req.file;

        // eslint-disable-next-line camelcase
        const { aluno_id } = req.body;
        // eslint-disable-next-line camelcase
        const image = await _Upload2.default.create({ originalname, filename, aluno_id });

        return res.json({ image });
      } catch (error) {
        return res.status(404).json({ message: 'User does not exist' });
      }
    });
  }
}

exports. default = new UploadController();
