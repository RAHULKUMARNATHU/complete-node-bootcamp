const express = require('express');

const router = express.Router();

const authController = require('./../controllers/authController')
const tourController = require('../controllers/tourController');

/*this middleware apply only on where id comes through params */
// router.param('id', tourController.checkID);

/*in post method we are chaining the multiple middleware ,
we can also set privilege of middleware by passing as we want the privilege  */
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/')
  .get(authController.protect ,tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
