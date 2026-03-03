import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'; 
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';

dotenv.config();

const app = express();

// --- 1. CONFIGURACIÓN DE CORS ---
// Esto permite que tu Frontend (en otra URL de Vercel) pueda consultar esta API
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // En producción pondrás la URL de tu frontend
  credentials: true
}));

// --- 2. MIDDLEWARES ---
app.use(express.json()); 
app.use(cookieParser());

// --- 3. CONEXIÓN A MONGODB ---
const connectionString = process.env.MONGO_URL_ATLAS;
mongoose.connect(connectionString, { family: 4 })
  .then(() => console.log("🚀 ¡CONEXIÓN EXITOSA A MONGODB!"))
  .catch((err) => console.error('❌ Error de conexión:', err.message));

// --- 4. RUTAS DE LA API ---
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/post', postRoutes);

// Ruta de prueba para verificar que la API está online
app.get('/', (req, res) => {
  res.send('API funcionando correctamente 🚀');
});

// --- 5. MANEJO DE ERRORES ---
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';
  res.status(statusCode).json({ 
    success: false,
    statusCode,
    message
  });
});

// --- 6. LANZAMIENTO ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`📡 Servidor corriendo en puerto ${PORT}`);
});