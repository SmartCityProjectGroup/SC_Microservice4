const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;



router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});