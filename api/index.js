import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path'; 
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';

dotenv.config();

// 2. Configurar __dirname (Correcto para ES Modules)
const __dirname = path.resolve();

const app = express();

// Middlewares
app.use(express.json()); 
app.use(cookieParser());

// Conexión a MongoDB
const connectionString = process.env.MONGO_URL_ATLAS;
mongoose.connect(connectionString, { family: 4 })
  .then(() => console.log("🚀 ¡CONEXIÓN EXITOSA A MONGODB!"))
  .catch((err) => console.error('❌ Error de conexión:', err.message));

// Definición de Rutas de la API
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/post', postRoutes);

// --- 3. CONFIGURACIÓN PARA DEPLOY (CORREGIDA) ---

// Servimos los archivos estáticos de la carpeta dist del cliente
// IMPORTANTE: Quitamos la barra '/' inicial para evitar errores en Windows
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// El "Catch-all": Cualquier ruta que no sea de la API, entrega el index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// ------------------------------------------------

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