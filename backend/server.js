const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// opções de conexão com o MySQL
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '', //12345678b / caso peça a senha
    database: 'db_numeros'
});

const app = new express();
app.listen(3000, () => {
    console.log('Servidor iniciado');
});

app.use(cors());
app.use(express.json());

// rotas
// ======================================
app.get("/", (req, res) => {
    // res.send('Hello World!');
    connection.query("SELECT COUNT(*) users FROM users", (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }

        res.send('MySQL connection OK.');
        // res.send(results);
    });
});

// ======================================
app.get("/user/:id", (req, res) => {
    connection.query("SELECT id, username, created_at FROM users WHERE id = ?", [req.params.id], (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }

        res.json(results);
    });
});

// ======================================
app.get("/user/:id/numeros", (req, res) => {
    connection.query("SELECT * FROM numeros WHERE id_user = ?", [req.params.id], (err, results) => {
        if (err) {
            res.send('MySQL connection error.');
        }
        res.json(results);
    });
});

// ======================================
app.post("/user/:id/numeros/update_status/", (req, res) => {
    console.log(req.params.id);
    console.log(req.body.id_numero);
    console.log(req.body.status);
    res.send('FINALIZADO');
});