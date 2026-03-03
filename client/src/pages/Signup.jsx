import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [publishSuccess, setPublishSuccess] = useState(null);
  const navigate = useNavigate();

  // Limpiar mensajes cuando el usuario vuelve a escribir
  const handleChange = (e) => {
    if (error) setError(null);
    if (publishSuccess) setPublishSuccess(null);
    
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPublishSuccess(null);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // Aquí manejamos errores específicos del backend (como usuario duplicado)
        return setError(data.message || 'Error al crear la cuenta');
      }

      setPublishSuccess("¡Cuenta creada! Redirigiendo al inicio de sesión...");
      
      // Redirección automática tras 3 segundos
      setTimeout(() => {
        navigate('/sign-in');
      }, 3000);

    } catch (err) {
      setError("No hay conexión con el servidor. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="flex w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        
        {/* Lado Izquierdo */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-indigo-600 to-purple-600 p-12 flex-col justify-center text-white">
          <h2 className="text-4xl font-bold mb-6">Únete hoy</h2>
          <p className="text-lg text-indigo-100 mb-8">Crea tu perfil y empieza a colaborar con nuestra comunidad de desarrolladores.</p>
          <div className="space-y-4 opacity-80">
             <p className="flex items-center gap-2"><span>🛡️</span> Datos encriptados de extremo a extremo</p>
             <p className="flex items-center gap-2"><span>🚀</span> Configuración de perfil instantánea</p>
          </div>
        </div>

        {/* Lado Derecho */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 bg-white">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-slate-800">Crear cuenta</h1>
            <p className="text-slate-500 text-sm mt-2">Es rápido y fácil</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Nombre de usuario"
                className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-300' : 'border-slate-200'} focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
                id="username"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Correo electrónico"
                className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-300' : 'border-slate-200'} focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
                id="email"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Contraseña (mín. 6 caracteres)"
                className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-300' : 'border-slate-200'} focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
                id="password"
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>

            {/* Alertas de Feedback */}
            <div className="min-h-[40px]"> {/* Espacio reservado para evitar saltos de layout */}
                {publishSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                    <span>✅</span> {publishSuccess}
                </div>
                )}

                {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                    <span>⚠️</span> {error}
                </div>
                )}
            </div>

            <button
              disabled={loading || publishSuccess}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </span>
              ) : 'Registrarse'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-600">
            <p>¿Ya eres miembro? <Link to="/sign-in" className="text-indigo-600 font-bold hover:underline">Inicia sesión aquí</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}