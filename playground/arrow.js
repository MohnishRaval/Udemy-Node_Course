const det = {
  name: ["raj", "ramesh", "shyam"],
  org: "tmeple",

  showme() {
    console.log(this.org);

    this.name.forEach((i) => {
      console.log(i + " attended party " + this.org);
    });
  },
};

det.showme();
