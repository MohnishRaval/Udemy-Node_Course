const t1 = (f1) => {
  setTimeout(() => {
    f1("print", undefined);
  }, 2000);
};

t1((error, result) => {
  if (error) {
    return console.log(error);
  }
  console.log(result);
});
