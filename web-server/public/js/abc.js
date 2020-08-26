fetch("http://localhost:3000/weather?address=boston").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log("Data error");
    } else {
      console.log(data.location);
      console.log(data.address);
    }
  });
});
