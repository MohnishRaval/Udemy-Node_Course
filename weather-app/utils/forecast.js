const request = require("request");

const forecast = (lattitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=2e605ad509a79000c3d26bb7e91f59e6&query=" +
    encodeURIComponent(longitude) +
    "," +
    encodeURIComponent(lattitude) +
    "&units=m";
  //api.weatherstack.com/current?access_key=2e605ad509a79000c3d26bb7e91f59e6&query=37.8267,-122.4233&units=m

  http: request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect sorry", undefined);
    } else if (response.body.error) {
      callback("Unable to find locations", undefined);
    } else {
      callback(undefined, {
        temp: response.body.current.temperature,
        feelslike: response.body.current.feelslike,
        //location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = forecast;
