const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');

const router = express.Router();

/*Applies this middleware to each route */
router.use(authController.isLoggedIn);
/*ALL Tours */
router.get('/', viewsController.getOverview);
/*get tour details */
router.get('/tour/:slug', viewsController.getTour);
/*Login Route */
router.get('/login', viewsController.getLoginForm);

module.exports = router;
