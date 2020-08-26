const x = {
  name: "raj",
  gen: "male",
  color: "white",
};

const det = (job, { name, gen }) => {
  console.log(name);
  console.log(gen);
  console.log(job);
};

det("yes", x);
