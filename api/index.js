import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js'; // ÚNICA VEZ

dotenv.config();

const app = express();

// Middlewares
app.use(express.json()); 
app.use(cookieParser());


// Conexión a MongoDB
// index.js
const connectionString = process.env.MONGO_URL_ATLAS;

mongoose.connect(connectionString, {
  family: 4 // ESTO ES CLAVE: obliga a Windows a usar IPv4
})
.then(() => {
    console.log("🚀 ¡CONEXIÓN EXITOSA A MONGODB CLOUD!");
})
.catch((err) => {
    console.error('❌ Error de conexión:', err.message);
});


// Definición de Rutas
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/post', postRoutes); // La URL en Insomnia será /api/post/create

// Middleware de Manejo de Errores
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';
  res.status(statusCode).json({ 
    success: false,
    statusCode,
    message
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`📡 Servidor corriendo en http://localhost:${PORT}`);
});