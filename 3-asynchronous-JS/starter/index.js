const fs = require("fs");

const superagent = require("superagent");

// // fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
// //   console.log(`Breed : ${data}`);

// //   superagent
// //     .get(`https://dog.ceo/api/breed/${data}/images/random`)
// //     .end((err, res) => {
// //       if (err) return console.log(err.message);
// //       console.log(res.body.message);

// //       fs.writeFile("dog-img.txt", res.body.message, (err) => {
// //         if (err) return console.log(err.message);
// //         console.log("Random dog image saved to file !");
// //       });
// //     });
// // });

// // fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
// //   console.log(`Breed : ${data}`);

// //   superagent
// //     .get(`https://dog.ceo/api/breed/${data}/images/random`)
// //     .then((res) => {
// //       console.log(res.body.message);

// //       fs.writeFile("dog-img.txt", res.body.message, (err) => {
// //         if (err) return console.log(err.message);
// //         console.log("Random dog saved to file! ");
// //       });
// //     })
// //     .catch((err) => {
// //       console.log(err.message);
// //     });
// // });

// /*Promisify */

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(`I could not find that file 😥`);
      }
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file 😥");
      resolve("success");
    });
  });
};

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed : ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro("dog-img.txt", res.body.message);
//   })
//   .then(() => {
//     console.log("Random dog saved to file! ");
//   })
//   .catch((err) => console.log(err.message.data));

/*Async Await  */
// const getDogPic = async () => {
//   try {
//     const data = await readFilePro(`${__dirname}/dog.txt`);
//     console.log(`Breed: ${data} `);

//     const res = await superagent.get(
//       `https://dog.ceo/api/breed/${data}/images/random`
//     );
//     console.log(res.body.message);

//     await writeFilePro("dog-img.txt", res.body.message);
//     console.log("Random dog saved to file! ");
//   } catch (error) {
//     console.log(error);
//   }
// };

// getDogPic();

/*Async function returns Promise automatically. */

/*Return value from async await  */

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed : ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const images = all.map((el) => el.body.message);

    console.log(images);

    writeFilePro("dog-img.txt", images.join(`\n`));
    console.log("Random dog saved to file");
  } catch (err) {
    // console.log(err);
    throw err;
  }
  return `2: READY 🐶`;
};

// console.log("1 :Wil get dog pics");

/*
getDogPic()
.then((x) => {
    console.log(x);
    console.log("3: Done getting dog pics");
})
.catch((err) => {
    console.log(`ERROR 💥`, err);
});
*/

(async () => {
  try {
    console.log("1 :Wil get dog pics");
    const x = await getDogPic();
    console.log(x);
    console.log("3: Done getting dog pics");
  } catch (err) {
    console.log(err);
  }
})();
