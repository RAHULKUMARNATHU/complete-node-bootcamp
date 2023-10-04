const express = require('express');
const authController = require('./../controllers/authController');
const tourController = require('../controllers/tourController');
const reviewRouter = require('./reviewRoutes');
// const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

/*this middleware apply only on where id comes through params */
// router.param('id', tourController.checkID);

/*in post method we are chaining the multiple middleware ,
we can also set privilege of middleware by passing as we want the privilege  */
router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide','guide'),
    tourController.getMonthlyPlan,
  );

/*queryParam:-tours-within?distance=233&center=-40,45&unit=mi */
/*routes params tours-within/233/center/-40,45/unit/mi */
router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(tourController.getToursWithin)


router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour,
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );

// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview,
//   );

module.exports = router;
