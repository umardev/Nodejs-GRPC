var express = require('express');
var router = express.Router();
var db = require('../config/db');
const testModel = require('../models/test'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('Hi');
  let abc = testModel.testFunction1();
  res.render('index', { title: abc });
});

module.exports = router;
