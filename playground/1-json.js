const fs = require("fs");

const readfile = fs.readFileSync("1-json.json");
const r1 = readfile.toString();
const r2 = JSON.parse(r1);
console.log(r1);
console.log(r2);

