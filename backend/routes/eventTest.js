const express = require('express');
const router = express.Router();
const eventTestController = require('../controller/eventTestController.js');

// test rabbitmq events
router.post('/testAboutUs', eventTestController.updateAboutUs);

module.exports = router;