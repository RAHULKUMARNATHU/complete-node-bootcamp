const catchAsync = require('../utils/catchAsync');
const tour = require('./../models/tourModel');

exports.getOverview = catchAsync(async (req, res) => {
  /*1) Get tour data from collection */
  const tours = await tour.find();
  /*2) Build template */

  /*3) Render that template using tour 1)*/
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
  });
};
