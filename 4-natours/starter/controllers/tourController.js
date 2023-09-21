const Tour = require('./../models/tourModel');

/*getAll tours */

exports.getAllTours = async (req, res) => {
  try {
    //BUILD QUERY
    //1) Filtering
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
    // console.log(queryObj, req.query);
    // console.log(req.requestTime);

    /*ADVANCE FILTERING */
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(queryStr);
    /*{difficulty:'easy' , duration:{ $gte: 5}}
    we have achieved {"difficulty":"easy","duration":{"$gte":"5"}}
    after JSON.parse we get the exact 
  ` query URL http://localhost:8000/api/v1/tours?duration[gte]=5&difficulty=easy&page=2&sort=1&limit=10&price[lte]=1500*/

    const query = Tour.find(JSON.parse(queryStr));

    const tours = await query;

    /*ANOTHER WAY TO FILTER */

    // const query = await Tour.find().where('duration').equals(5).where().equals();

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
