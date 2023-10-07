const catchAsync = require('../utils/catchAsync');
const Tour = require('./../models/tourModel');

exports.getOverview = catchAsync(async (req, res) => {
  /*1) Get tour data from collection */
  const tours = await Tour.find();
  /*2) Build template */

  /*3) Render that template using tour 1)*/
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  console.log(tour);
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
    tour
  });
});
