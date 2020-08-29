//const { reject } = require("async");

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

const doa = async () => {
  const sum = await add(1, 2);
  const sum2 = await add(sum, 4);
  return sum2;
};

doa()
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log("e ", e);
  });
