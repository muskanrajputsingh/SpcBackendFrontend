import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser"

// Routes
import userRoute from './routes/user.route.js';
import marketPlace from './routes/marketplace.route.js';
import propertyRoute from './routes/property.route.js';
import productRoute from "./routes/product.route.js";


dotenv.config();
const app = express();
const PORT = 8000;

// Configure CORS for development
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // Added PATCH here
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (_req, res) => {
  res.status(200).json({ message: 'API is running 🚀' });
});

// API Routes
app.use('/api/users', userRoute);
app.use('/api/marketplace', marketPlace);
app.use('/api/property', propertyRoute);
app.use('/api/product', productRoute);
app.use('')


// Error handling for CORS
import type { Request, Response, NextFunction } from 'express';

app.use((err: { message: string; }, _req: Request, res: Response, next: NextFunction) => {
  if (err.message === 'Not allowed by CORS') {
    res.status(403).json({ error: 'CORS policy blocked this request' });
  } else {
    next(err);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});