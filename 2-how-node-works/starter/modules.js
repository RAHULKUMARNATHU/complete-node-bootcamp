// console.log(arguments);


// console.log(require('module').wrapper);

const Cal = require('./test-module1');

const calculator = new Cal();


console.log(calculator.add(10, 20));

/*exports */

const cal2 = require('./test-module2') ;
const {add ,multiply , divide} = require('./test-module2')
console.log(cal2.add(20 , 50));
console.log(cal2.multiply(20 ,50));
console.log(divide(40 , 20));


/*Caching */

require('./test-module3')();
require("./test-module3")();
require("./test-module3")();
