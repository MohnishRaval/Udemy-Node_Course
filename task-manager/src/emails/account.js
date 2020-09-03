const sgmail = require("@sendgrid/mail");
// const sendgridapikey =
//   "SG.D39TTnTgSu29ON7OO2j-2w.xWvtVytNgTSdgugCjTlqTvAHRQJHqFZJ69Cqqx9-98g";

sgmail.setApiKey(process.env.SENDGRID_API_KEY);

// sgmail.send({
//   to: "mohnishraval40@gmail.com",
//   from: "mohnishraval40@gmail.com",
//   subject: "First Email",
//   text: "Hello From Task App",
//   html: `<strong>GREETINGS FROM TASk APP</strong>`,
// });

const welcomemail = (email, name) => {
  sgmail.send({
    to: email,
    from: "mohnishraval40@gmail.com",
    subject: "Welcome To Task App",
    text: `Welcome to the TASK APP , ${name}.Lets, get started`,
  });
};

const deleteusermail = (email, name) => {
  sgmail.send({
    to: email,
    from: "mohnishraval40@gmail.com",
    subject: "YOU HAVE BEEN UNSUBSRIBED BY TASK-APP",
    text: `Hello , ${name}.UNSUBSRIBED SUCCESSFULLY`,
  });
};

module.exports = {
  welcomemail,
  deleteusermail,
};
