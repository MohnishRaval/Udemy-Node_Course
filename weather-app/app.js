const request = require("request");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

// const url =
//   "http://api.weatherstack.com/current?access_key=2e605ad509a79000c3d26bb7e91f59e6&query=37.8267,-122.4233&units=m";

// request({ url: url, json: true }, (error, response) => {
//   //   const data = JSON.parse(response.body);

//   console.log(response.body.current.temperature);
// });
//pk.eyJ1IjoibW9obmlzaDEyMyIsImEiOiJja2U1em0zZTgxN2R4MnFtc2NiZGhwcDhvIn0.U7O9j353LzBYDLUruHM9gg
// const ur12 =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibW9obmlzaDEyMyIsImEiOiJja2U1em0zZTgxN2R4MnFtc2NiZGhwcDhvIn0.U7O9j353LzBYDLUruHM9gg";

// request({ url: ur12, json: true }, (error, response) => {
//   if (error) {
//     console.log("Unable to connect");
//   } else if (response.body.error) {
//     console.log("Unable to find locations");
//   } else {
//     const lat = response.body.features[0].center[1];
//     const long = response.body.features[0].center[0];
//     console.log(lat + " " + long);
//   }
// });

// const geocode = (address, callback) => {
//   const url =
//     "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
//     encodeURIComponent(address) +
//     ".json?access_token=pk.eyJ1IjoibW9obmlzaDEyMyIsImEiOiJja2U1em0zZTgxN2R4MnFtc2NiZGhwcDhvIn0.U7O9j353LzBYDLUruHM9gg&limit=1";

//   request({ url: url, json: true }, (error, response) => {
//     if (error) {
//       callback("Unable to connect sorry", undefined);
//     } else if (response.body.features.length === 0) {
//       callback("Unable to find locations", undefined);
//     } else {
//       callback(undefined, {
//         latitude: response.body.features[0].center[1],
//         longitude: response.body.features[0].center[0],
//         location: response.body.features[0].place_name,
//       });
//     }
//   });
// };

geocode("Boston", (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
  forecast(data.latitude, data.longitude, (error, data) => {
    console.log("Error", error);
    console.log("Data", data);
  });
});
// });
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
// forecast(-75.7088, 44.1545, (error, data) => {
//   console.log("Error", error);
//   console.log("Data", data);
// });
