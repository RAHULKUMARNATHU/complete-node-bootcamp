const fs = require("fs");

setTimeout(() => {
  console.log("Timer 1 Finished");
}, 0);
setImmediate(() => {
  console.log("Immediate 1 Finished");
}, 0);



fs.readFile('test-file.txt' , ()=>{
    console.log("I/O finished");
    console.log("-------------------");


    setTimeout(()=> console.log("Timer 2 finished"),0);
    setTimeout(() => console.log("Timer 3 finished"),3000);
    setImmediate(() => console.log("Immediate 2 finished"));
    process.nextTick(()=> console.log("Process.nextTick")); /* wait in microTask queue */

})


console.log("Hello from top-level code");