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
    //example to test database connection
    // const sqlInsert = "INSERT INTO users (name, email, password) VALUES ('senf', 'john@gmail.com', 'MAlsch.7')";
    // db.query(sqlInsert, (error, result) => {
    //     console.log("error", error);
    //     console.log("result", result);
    //     res.send("Hello Express");
    // });
})

//get jokes
app.get("/jokes/get", (req, res) => {
    const sqlGet = "SELECT * FROM jokes ORDER BY RAND() LIMIT 1";
    db.query(sqlGet, (error, result) => {
        res.send(result);
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
}) 

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})