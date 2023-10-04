const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const handlerFactory = require('./handlerFactory');
const AppError = require('../utils/appError');
// const APIFeatures = require('./../utils/apiFeatures');

(exports.aliasTopTours = async (req, res, next) => {
  (req.query.sort = '-ratingsAverage, price'),
    (req.query.limit = '5'),
    (req.query.fields = 'name , price ,ratingsAverage,summary,difficulty');
  next();
}),
  /*Tour stats */
  (exports.getTourStats = catchAsync(async (req, res, next) => {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          // _id :'$ratingsAverage',
          // _id: '$price',
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRating: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: -1 },
      },
      /*we can also repeat the stages */
      // {
      //   $match: { _id: { $ne: 'EASY' } },
      // },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  }));

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;

  /*unwind  : deconstruct an array fields from the input documents and then output
     one document for each element  of the array  {one document for each of the 
    date(data was in form of array ) }  */
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStart: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    /*add new field  monthly wise show the numTourStart*/
    {
      $addFields: { numTourStart: '$_id' },
    },
    /*hide field _id */
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { month: -1 },
    },
    {
      $limit: 12,
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});

exports.getToursWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide Latitude and longitude in the format lat,lng  ',
        400,
      ),
    );
  }

  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
});

/*get-all-tours  */
exports.getAllTours = handlerFactory.getAll(Tour);
/*get tour by id */
exports.getTour = handlerFactory.getOne(Tour, { path: 'reviews' });
/*create tour */
exports.createTour = handlerFactory.createOne(Tour);
/*Update tour */
exports.updateTour = handlerFactory.updateOne(Tour);
/*Delete Tour */
exports.deleteTour = handlerFactory.deleteOne(Tour);
