const fs = require("fs");

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\n Created on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written');

/*Reading and writing file asynchronously */
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  if (err) return console.log(`Error !`);
  fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data1) => {
    if (err) return console.log(`Error !`);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data2) => {
      if (err) return console.log(`Error !`);
      fs.writeFile(`./txt/final.txt`, `${data1}\n${data2}`, (Error) => {
        if (!Error) {
          console.log(`Your File has been Written`);
        }
      });
    });
  });
});

console.log("will read file Asynchronously");
