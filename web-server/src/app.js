const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const PublicPathDirectory = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");
console.log(path.join(__dirname, "../public"));

app.set("view engine", "hbs");
app.set("views", viewspath);
hbs.registerPartials(partialspath);
app.use(express.static(PublicPathDirectory));

// app.get("", (req, res) => {
//   res.send("Hellp");
// });
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Mohnish",
  });
});

app.get("/products", (req, res) => {
  //console.log(req.query);
  if (!req.query.search) {
    return res.send({
      error: "provide input",
    });
  }

  console.log(req.qurey.search);
  res.send({
    products: [],
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Helpme",
  });
});

// app.get("*", (req, res) => {
//   res.send("404 Error");
// });

// app.get("/help", (req, res) => {
//   res.send("help");
// });
// app.get("/about", (req, res) => {
//   res.send("<head><title>About</title></head>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "provide address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return req.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );

  // const obj = {
  //   weather: "fine",
  //   address: "phila",
  // };
  // res.send({
  //   obj,
  // });
});
app.listen(3000, () => {
  console.log("port 3000");
});
