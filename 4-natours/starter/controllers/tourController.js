const Tour = require('./../models/tourModel');

/*getAll tours */

exports.aliasTopTours = async (req, res, next) => {
  (req.query.sort = '-ratingsAverage, price'),
    (req.query.limit = '5'),
    (req.query.fields = 'name , price ,ratingsAverage,summary,difficulty');
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    //BUILD QUERY
    //1A) Filtering
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
    // console.log(queryObj, req.query);
    // console.log(req.requestTime);

    /*1B) ADVANCE FILTERING */
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(queryStr);
    /*{difficulty:'easy' , duration:{ $gte: 5}}
    we have achieved {"difficulty":"easy","duration":{"$gte":"5"}}
    after JSON.parse we get the exact 
  ` query URL http://localhost:8000/api/v1/tours?duration[gte]=5&difficulty=easy&page=2&sort=1&limit=10&price[lte]=1500*/

    let query = Tour.find(JSON.parse(queryStr));

    /*2)SORTING */
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    /*3) Field limiting */
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    /*4)PAGINATION */
    const page = req.query.page * 1 || 1;
    console.log(req.query.page);
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTour = await Tour.countDocuments();
      console.log(skip);
      if (skip >= numTour) {
        throw new Error('This page does not exists');
      }
    }

    const tours = await query;

    /*ANOTHER WAY TO FILTER */
    /* query.sort().select().skip().limit() */
    // const query = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');

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
