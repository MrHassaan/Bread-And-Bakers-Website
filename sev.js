const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const conf = require('./conf');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bakery'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ message: 'User created' });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT id FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (results.length == 0) {
      return res.status(401).json({ message: 'Invalid login credentials' });
    }
    const userId = results[0].id;
    const token = jwt.sign({ userId }, conf.secret, { expiresIn: '100h' });
    res.json({ message: 'Login successful', token });
  });
});

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, conf.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
}

app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Protected route' });
});

app.listen(8000, () => {
  console.log('Server started on port 8000');
});