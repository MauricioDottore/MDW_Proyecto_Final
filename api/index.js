import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path'; // <--- 1. Importar path
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';

dotenv.config();

// 2. Configurar __dirname (necesario al usar "type": "module")
const __dirname = path.resolve();

const app = express();

app.use(express.json()); 
app.use(cookieParser());

// Conexión a MongoDB
const connectionString = process.env.MONGO_URL_ATLAS;
mongoose.connect(connectionString, { family: 4 })
  .then(() => console.log("🚀 ¡CONEXIÓN EXITOSA!"))
  .catch((err) => console.error('❌ Error:', err.message));

// Definición de Rutas de la API
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/post', postRoutes);

// --- 3. CONFIGURACIÓN PARA DEPLOY ---
// Indicamos que la carpeta "client/dist" contiene los archivos estáticos
app.use(express.static(path.join(__dirname, '/client/dist')));

// Cualquier ruta que NO empiece con /api, redirigirla al index.html del frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
// -------------------------------------

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
  console.log(`📡 Servidor corriendo en puerto ${PORT}`);
});