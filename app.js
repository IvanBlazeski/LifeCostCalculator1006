const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const categoriesRoute = require('./routes/categories');
const usersRoute = require('./routes/users');
const dbRoutes = require('./routes/db');
const costRoutes = require('./routes/costRoutes');
const swaggerSpec = require('./swagger/swagger');

dotenv.config();

const app = express();

// --- CORS middleware (стави го веднаш по express()) ---
app.use(cors({
  origin: ['http://localhost:4200', 'https://lifecostcalculator.onrender.com'], // Додај и други домени ако треба
  credentials: true
}));

app.use(express.json());
app.use(helmet());
app.use(express.static('public'));

// Swagger документација
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api/swagger.json', (req, res) => res.json(swaggerSpec));

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lifecostdb';

// MongoDB connect
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/categories', categoriesRoute);
app.use('/api/costs', costRoutes);
app.use('/api/users', usersRoute);
app.use('/db', dbRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Серверот е стартуван на портата ${PORT}`);
});
