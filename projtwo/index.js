// Import required module csvtojson and mongodb packages
// const csvtojson = require("csvtojson");
const AWS = require("aws-sdk");
const mongodb = require("mongodb");
const fs = require("fs");

const BUCKET_NAME = "sb-project-nodetos3";
const KEY_ID = "AKIARH5FK2MGMDLOJB5T";
const SECRET_KEY = "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";

var s3 = new AWS.S3({
  accessKeyId: KEY_ID,
  secretAccessKey: SECRET_KEY,
});
// const params = {
//   Bucket: BUCKET_NAME
// }

// s3.createBucket(params, (err, data) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("Bucket Created Successfully", data.location)
//   }
// })

const uploadFile = (filename) => {
  const fileContent = fs.readFileSync(filename);

  var params = {
    Bucket: BUCKET_NAME,
    Key: "csvFile",
    Body: fileContent,
    ContentType: "text/csv",
    // ContentDisposition: contentDiposition(filePath, {
    //   type: 'inline'
    // }),
    CacheControl: "public, max-age=86400",
  };
  s3.upload(params, (err, data) => {
    if (err) {
      console.log("Error at uploading CSV file on s3 bucket", err);
      next(err);
    } else {
      console.log("File uploaded successfully", data.location);
      next(null, filePath);
    }
  });
};

uploadFile("covid.csv");

// Define the URL of local or remote MongoDB instance
var url = "mongodb://localhost:27017/SampleDb";

// establish connection to database
var dbConn;
mongodb.MongoClient.connect(url, {
  useUnifiedTopology: true,
})
  .then((client) => {
    console.log("DB Connected!");
    dbConn = client.db();
  })
  .catch((err) => {
    console.log("DB Connection Error: ${ err.message }");
  });

// Fetch CSV file and insert all rows into the database.
// CSV file name
const fileName = "sample.csv";
var arrayToInsert = [];
csvtojson()
  .fromFile(fileName)
  .then((source) => {
    // Fetching the all data from each row
    for (var i = 0; i < source.length; i++) {
      var oneRow = {
        firstName: source[i]["Firstname"],
        lastName: source[i]["Lastname"],
        city: source[i]["City"],
        salary: source[i]["Salary"],
      };
      arrayToInsert.push(oneRow);
    }
    //inserting into the table “employees”
    var collectionName = "employees";
    var collection = dbConn.collection(collectionName);
    collection.insertMany(arrayToInsert, (err, result) => {
      if (err) console.log(err);
      if (result) {
        console.log("Import CSV into database successfully.");
      }
    });
  });



// // upload to mongodb form reactjs

// const express = require("express");
// const app = express();
// var bodyParser = require("body-parser");
// app.set("view engine", "ejs");
// const port = 5000;
// var cors = require("cors");
// var dbOjbect = require("./db");
// app.use(express.static("public"));
// var userRouter = require("./user-router");
// var productRouter = require("./product-router");
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(bodyParser.json());
// app.use(cors());
