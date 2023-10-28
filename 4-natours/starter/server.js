const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION !  💥 Shutting down... ');
  console.log(err.name, ':', err.message);
  process.exit(1);
});

const app = require('./app');

let DB;
if (process.env.NODE_ENV === 'production') {
  DB = process.env.DATABASE;
} else {
  DB = process.env.DATABASE_LOCAL;
}
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successfully!');
  });

// console.log(app.get('env'));

// const testTour = new Tour({
//   name: 'The park camper',
//   rating: 4.7,
//   price: 997,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('Error 💥', err);
//   });

const port = process.env.PORT || 3000;

/*4) START SERVER */
const server = app.listen(port, () => {
  console.log(`App Running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION 💥 ');
  console.log(err.name, ':', err.message);
  /*close gracefully not abrupt the running server or pending request */
  server.close(() => {
    process.exit(1);
  });
});



process.on('SIGTERM',() => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(()=> {
    console.log('💥 Process terminated!');
  })
})