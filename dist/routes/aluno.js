"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _Aluno = require('../controllers/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);

const router = new (0, _express.Router)();

router.get('/', _Aluno2.default.index);
router.post('/store/', _Aluno2.default.store);
router.get('/show/:id', _Aluno2.default.show);
router.put('/update/:id', _Aluno2.default.update);
router.delete('/delete/:id', _Aluno2.default.delete);

exports. default = router;
