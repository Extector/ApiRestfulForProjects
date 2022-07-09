"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _Upload = require('../controllers/Upload'); var _Upload2 = _interopRequireDefault(_Upload);

const router = new (0, _express.Router)();

router.post('/', _Upload2.default.store);

exports. default = router;
