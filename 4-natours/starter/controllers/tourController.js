const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');

/*getAll tours */

exports.aliasTopTours = async (req, res, next) => {
  (req.query.sort = '-ratingsAverage, price'),
    (req.query.limit = '5'),
    (req.query.fields = 'name , price ,ratingsAverage,summary,difficulty');
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

    // console.log(await features.query);
    // const tours = await query; /*previously */
    const tours = await features.query;

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

/*get tour by id */

exports.getTour = async (req, res) => {
  try {
    // const tour = await Tour.find({ name: name });

    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(200).json({
        status: 'success',
        message: 'No data matched !',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

/*create tour */
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

/*Update tour */
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

/*Delete Tour */
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (tour === null) {
      return res.status(200).json({
        status: 'success',
        message: 'id does not exists',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
