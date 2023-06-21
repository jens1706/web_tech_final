const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "joke_generator",
    password: "password",
    database: "jokegenerator"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.send("Hello World");
});

//get jokes
app.get("/jokes/get", (req, res) => {
    const sqlGet = "SELECT * FROM jokes ORDER BY RAND() LIMIT 1";
    db.query(sqlGet, (error, result) => {
        if(error) {
            console.log(error);
        }
        else {
            res.send(result);
        }
    });
});

//rate jokes
app.post("/jokes/rate", (req, res) => {
    const { user_id, joke_id, joke_rating } = req.body;
    const sqlInsert = "INSERT INTO joke_rating (user_id, joke_id, joke_rating) VALUES (?, ?, ?)";
    db.query(sqlInsert, [user_id, joke_id, joke_rating], (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});

//create joke
app.post("/jokes/create", (req, res) => {
    const {joke} = req.body;
    const sqlInsert = "INSERT INTO jokes (joke) VALUES (?);";
    db.query(sqlInsert, [joke], (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});

//create user
app.post("/user/register", (req, res) => {
    const {name, email, password} = req.body;
    const sqlInsert = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, password], (error, result) => {
        if(error) {
            console.log(error);
        }
        else {
            res.json(result);
          }
    });
});

app.post("/user/check", (req, res) => {
    const { email } = req.body;
    const sqlCheck = "SELECT * FROM users WHERE email = ?";
    db.query(sqlCheck, [email], (error, result) => {
      if (error) {
        console.log(error);
      } 
      else {
        res.json(result);
      }
    });
});

app.post("/user/login", (req, res) => {
    const { email, password } = req.body;
    const sqlLogin = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sqlLogin, [email, password], (error, result) => {
        if (error) {
            return res.json("Error");
        } 
        else {
            return res.json(result);
        }
    });
});
  
app.post("/user/validate", (req, res) => {
    const { name, email } = req.body;
    const sqlLogin = "SELECT * FROM users WHERE name = ? AND email = ?";
    db.query(sqlLogin, [name, email], (error, result) => {
        if (error) {
            return res.json("Error");
        } 
        else {
            return res.json(result);
        }
    });
});

app.put("/user/update", (req, res) => {
    const { password, id } = req.body;
    const sqlUpdate = "UPDATE users SET password = ? WHERE id = ?";
    db.query(sqlUpdate, [password, id], (error, result) => {
        if (error) {
            return res.json("Error");
        } else {
            return res.json(result);
        }
    });
});

app.post("/user/delete", (req, res) => {
    const { email, password } = req.body;
    const sqlDelete = "DELETE FROM users WHERE email = ? AND password = ?";
    db.query(sqlDelete, [email, password], (error, result) => {
      if (error) {
        return res.json("Error");
      } else {
        if (result.affectedRows === 0) {
            // No matching entry found
            return res.json(false);
        } else {
            return res.json(true);
          }
      }
    });
  });
  

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});