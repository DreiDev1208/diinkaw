const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./config/server');
require('dotenv/config');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Error executing query' });
    } else if (results.length === 0) {
      console.log('Invalid credentials');
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
      const user = results[0];
      console.log('Login successful');
      res.status(200).json({ message: 'Login successful', user });
    }
  });
});


//Registration
app.post('/register', (req, res) => {
  const { fullName, username, email, password } = req.body;

  pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Error executing query' });
    } else if (results.length > 0) {
      const duplicateUser = results.find((user) => user.username === username);
      const duplicateEmail = results.find((user) => user.email === email);

      if (duplicateUser) {
        console.log('Username already taken');
        res.status(409).json({ error: 'DuplicateUsername' });
      } else if (duplicateEmail) {
        console.log('Email already taken');
        res.status(409).json({ error: 'DuplicateEmail' });
      }
    } else {
      const formData = {
        fullName,
        username,
        email,
        password,
      };

      pool.query('INSERT INTO users SET ?', formData, (error, results) => {
        if (error) {
          console.error('Error inserting data:', error);
          res.status(500).json({ error: 'Error inserting data' });
        } else {
          console.log('Data inserted successfully:', results);
          res.status(200).json({ message: 'Registration successful' });
        }
      });
    }
  });
});




const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
