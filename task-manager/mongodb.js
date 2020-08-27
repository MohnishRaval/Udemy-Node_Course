// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
const { MongoClient, ObjectID } = require("mongodb");
const ConnectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectID();
console.log(id);

MongoClient.connect(
  ConnectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      console.log("Error ");
    }
    console.log("Connected to MongoDB");
    const db = client.db(databaseName);
    // const p1 = db
    //   .collection("users")
    //   .insertOne({
    //     name: "chennia",
    //     age: 27,
    //   })
    //   .then((res) => {
    //     console.log("Result updated ");
    //   })
    //   .catch((error) => {
    //     console.log("Error");
    //   });
    const x = db
      .collection("users")
      .deleteOne({
        name: "chennia",
      })
      .then((res) => {
        console.log(res.modifiedCount);
      })
      .catch((error) => {
        console.log("Error");
      });
  }
);
