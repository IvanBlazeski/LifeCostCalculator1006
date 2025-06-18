const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const users = []; 

const app = express();
app.use(cors({
  origin: 'http://localhost:4200', 
  credentials: true
}));
app.use(bodyParser.json());

// Регистрација
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Недостасуваат податоци.' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: 'Email веќе постои.' });
  }
  users.push({ name, email, password });
  res.json({ message: 'Успешна регистрација!' });
});

// Најава
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Погрешен email или лозинка.' });
  }
  res.json({ message: 'Успешна најава!', name: user.name, email: user.email });
});

app.listen(3000, () => {
  console.log('Backend server running on http://localhost:3000');
});
