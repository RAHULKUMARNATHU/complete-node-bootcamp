const express = require('express');

const router = express.Router();

const tourController = require('../controllers/tourController');
/*this middleware apply only on where id comes through params */
// router.param('id', tourController.checkID);

/*in post method we are chaining the multiple middleware ,
we can also set privilege of middleware by passing as we want the privilege  */
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
