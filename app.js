const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // serve index.html

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
});
db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected!");
});

// Read all users
app.get("/api/users", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create user
app.post("/api/users", (req, res) => {
    const { name, email } = req.body;
    db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err) => {
        if (err) throw err;
        res.json({ message: "User added" });
    });
});

// Update user
app.put("/api/users/:id", (req, res) => {
    const { name, email } = req.body;
    db.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, req.params.id], (err) => {
        if (err) throw err;
        res.json({ message: "User updated" });
    });
});

// Delete user
app.delete("/api/users/:id", (req, res) => {
    db.query("DELETE FROM users WHERE id = ?", [req.params.id], (err) => {
        if (err) throw err;
        res.json({ message: "User deleted" });
    });
});

// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
