const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

// console.log(app.get('env'));

const port = process.env.PORT || 3000;

/*4) START SERVER */
app.listen(port, () => {
  console.log(`App Running on port ${port}...`);
});
