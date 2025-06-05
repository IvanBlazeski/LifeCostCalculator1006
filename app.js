const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Dummy API (ќе се користи подоцна)
const costRoutes = require('./routes/costRoutes');
app.use('/api/costs', costRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Серверот е стартуван на портата ${PORT}`);
});
