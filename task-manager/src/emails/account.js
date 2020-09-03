const sgmail = require("@sendgrid/mail");

sgmail.setApiKey(process.env.SENDGRID_API_KEY);

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
