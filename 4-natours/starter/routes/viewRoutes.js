const express = require('express');
const viewsController = require('./../controllers/viewsController');

const router = express.Router();
/*ALL Tours */
router.get('/', viewsController.getOverview);
/*get tour details */
router.get('/tour/:slug', viewsController.getTour);
/*Login Route */
router.get('/login', viewsController.getLoginForm);

module.exports = router;
