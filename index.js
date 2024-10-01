const express = require("express");
const mysql = require("");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12734633",
  password: "qX2B4tHjCb",
  database: "sql12734633",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

app.use(express.static("public"));

app.post("/add-task", (req, res) => {
  const { task } = req.body;
  db.query("INSERT INTO tasks (task) VALUES (?)", [task], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error adding task");
    } else {
      res.redirect("/");
    }
  });
});

app.get("/", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving tasks");
    } else {
      res.send(results);
    }
  });
});

app.post("/delete-task", (req, res) => {
  const { id } = req.body;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting task");
    } else {
      res.redirect("/");
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
