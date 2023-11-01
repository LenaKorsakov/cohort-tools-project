require("dotenv").config({ path: "./.env.sample" });
require("./config/dbConnect");

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const Student = require("./models/Student.model");
const Cohort = require("./models/Cohorts.model");

// INITIALIZE EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(cors());
// app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/cohorts", require("./routes/cohort.routes"));
// ROUTES - https://expressjs.com/en/starter/basic-routing.html

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/students", (req, res) => {
  Student.find({})
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving  ->", error);
      res.status(500).send({ error: "Failed to retrieve students" });
    });
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

// START SERVER
console.log(process.env);
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
