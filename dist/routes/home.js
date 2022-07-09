"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _Home = require('../controllers/Home'); var _Home2 = _interopRequireDefault(_Home);

const router = new (0, _express.Router)();

router.get('/', _Home2.default.index);

exports. default = router;
