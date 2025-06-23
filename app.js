// app.js
const express        = require('express');
const mongoose       = require('mongoose');
const dotenv         = require('dotenv');
const helmet         = require('helmet');
const cors           = require('cors');
const swaggerUi      = require('swagger-ui-express');
const bodyParser     = require('body-parser');

dotenv.config();

const authRoutes      = require('./routes/authRoutes');   // /api/auth/*
const usersRoutes     = require('./routes/users');        // /api/users/*
const categoriesRoute = require('./routes/categories');
const costRoutes      = require('./routes/costRoutes');
const dbRoutes        = require('./routes/db');
const swaggerSpec     = require('./swagger/swagger');

const app = express();

// ✅ Middleware
app.use(cors({
  origin: ['http://localhost:4200', 'https://lifecostcalculator.onrender.com'],
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));
app.use(helmet());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));

// ✅ Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api/swagger.json', (req, res) => res.json(swaggerSpec));

// ✅ Routes (важен редослед!)
app.use('/api/auth', authRoutes);           // POST /api/auth/login
app.use('/api/users', usersRoutes);         // CRUD
app.use('/api/categories', categoriesRoute);
app.use('/api/costs', costRoutes);
app.use('/db', dbRoutes);

// ✅ Mongo + Server
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected!');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));
