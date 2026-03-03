import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  
  // Extraemos el estado global de Redux. 
  // 'state.user' viene del nombre que pusiste en el reducer de store.js
  const { loading, error } = useSelector((state) => state.user);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.id]: e.target.value.trim() // trim() evita espacios accidentales
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica antes de disparar Redux
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Por favor, completa todos los campos."));
    }

    try {
      dispatch(signInStart());
      
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      // Si el backend responde con un error estructurado
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      
      // Éxito: Guardamos el usuario en Redux y navegamos
      dispatch(signInSuccess(data));
      navigate('/'); 
      
    } catch (err) {
      // Error de red o servidor caído
      dispatch(signInFailure("Error de conexión con el servidor."));
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="flex w-full max-w-[900px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Lado Izquierdo: Formulario */}
        <div className="w-full md:w-1/2 p-10 lg:p-14">
          <div className="mb-10">
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
              Hola de nuevo.
            </h1>
            <p className="text-slate-500 mt-2">Ingresa a tu cuenta de Buypedia.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative">
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                id="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
                id="password"
                onChange={handleChange}
                required
              />
            </div>

            {/* Mostramos el error que viene directamente de Redux */}
            {error && (
              <p className="text-red-500 text-sm font-semibold ml-2 animate-bounce">
                ⚠️ {error}
              </p>
            )}

            <button
              disabled={loading}
              className="bg-indigo-600 text-white p-4 rounded-2xl font-bold uppercase tracking-wide hover:bg-indigo-700 transition-all disabled:opacity-70 shadow-lg shadow-indigo-100 mt-2 active:scale-95"
            >
              {loading ? 'Cargando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500">
              ¿No tienes una cuenta?{' '}
              <Link to="/sign-up" className="text-indigo-600 font-bold hover:underline">
                Regístrate gratis
              </Link>
            </p>
          </div>
        </div>

        {/* Lado Derecho: Visual/Decorativo */}
        <div className="hidden md:flex md:w-1/2 bg-slate-900 relative items-center justify-center p-12 overflow-hidden">
          <div className="absolute w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center">
            <div className="text-6xl mb-6">📦</div>
            <h2 className="text-3xl font-bold text-white mb-4">La espera terminó.</h2>
            <p className="text-slate-400">
              Tus productos favoritos están a un solo clic de distancia.
            </p>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-indigo-600 text-white text-center text-xs font-bold tracking-widest uppercase">
            Autenticación segura vía JWT
          </div>
        </div>
      </div>
    </div>
  );
}