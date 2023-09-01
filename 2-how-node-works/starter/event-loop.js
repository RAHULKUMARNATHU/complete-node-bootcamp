const fs = require("fs");

setTimeout(() => {
  console.log("Timer 1 finished");
}, 0);

setImmediate(() => {
  console.log("Immediate 2 finished");
});

fs.readFile("test-file.txt", () => {
  setTimeout(() => {
    console.log("Timer 2 finished");
  });

  setImmediate(() => {
    console.log("Immediate 2 finished");
  });

  process.nextTick(() => {
    console.log("Process.nextTick");
  });

  console.log("I/O finished");
});

console.log("Hello from the top-level code");
