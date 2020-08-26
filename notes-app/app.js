const chalk = require("chalk");
const yargs = require("yargs");

const notes = require("./notes.js");
//const { demand, describe } = require("yargs");

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Body Description",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.addNotes(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "remove  note",
  builder: {
    title: {
      demandOption: true,
      describe: "Note title",
      type: "String",
    },
  },
  handler: function (argv) {
    notes.removeNotes(argv.title);
  },
});

yargs.parse();
