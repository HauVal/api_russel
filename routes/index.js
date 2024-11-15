const express = require('express');
const router = express.Router();
const userRoute = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('API Port de Plaisance - Acceil');
});

router.use('/users', userRoute);

module.exports = router;
