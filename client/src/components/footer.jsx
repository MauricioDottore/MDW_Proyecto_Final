import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaShieldAlt, FaRocket, FaGlobe } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-gray-100 pt-12 pb-12 px-4 sm:px-6 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        
        {/* Columna 1: Branding */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center group">
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-pink-500 to-indigo-600 bg-[length:200%_auto] transition-all duration-1000 ease-in-out group-hover:bg-[right_center]">
                BUYPEDIA
              </span>
            </span>
          </Link>
          <p className="text-slate-500 text-sm leading-relaxed">
            Tu enciclopedia de compras favorita. Descubre y adquiere los mejores productos con seguridad y estilo.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 transition-all duration-300">
              <FaFacebook size={20} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-500 transition-all duration-300">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-all duration-300">
              <FaTwitter size={20} />
            </a>
            <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-all duration-300">
              <FaGithub size={20} />
            </a>
          </div>
        </div>

        {/* Columna 2: Navegación */}
        <div>
          <h3 className="text-slate-800 font-bold mb-6 text-sm uppercase tracking-wider">Explorar</h3>
          <ul className="flex flex-col gap-3">
            <li>
              <Link to="/" className="text-slate-500 hover:text-indigo-600 text-sm transition-all duration-300">Home</Link>
            </li>
            <li>
              <Link to="/about" className="text-slate-500 hover:text-indigo-600 text-sm transition-all duration-300">About</Link>
            </li>
            <li>
              <Link to="/projects" className="text-slate-500 hover:text-indigo-600 text-sm transition-all duration-300">Products</Link>
            </li>
          </ul>
        </div>

        {/* Columna 3: Beneficios (En lugar de Legal vacío) */}
        <div>
          <h3 className="text-slate-800 font-bold mb-6 text-sm uppercase tracking-wider">Compromiso</h3>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-3 text-slate-500 group">
              <FaShieldAlt className="text-indigo-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm">Pago 100% Seguro</span>
            </li>
            <li className="flex items-center gap-3 text-slate-500 group">
              <FaRocket className="text-pink-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm">Envío Express</span>
            </li>
            <li className="flex items-center gap-3 text-slate-500 group">
              <FaGlobe className="text-emerald-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm">Soporte Global</span>
            </li>
          </ul>
        </div>

        {/* Columna 4: Info de Contacto / Interés (En lugar de Newsletter) */}
        <div>
          <h3 className="text-slate-800 font-bold mb-6 text-sm uppercase tracking-wider">Contacto</h3>
          <div className="flex flex-col gap-3">
            <p className="text-slate-500 text-sm">
              ¿Tienes dudas? Contáctanos y nuestro equipo te ayudará en menos de 24 horas.
            </p>
            <Link 
              to="/about" 
              className="mt-2 w-fit px-6 py-2 text-xs font-bold text-white rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 hover:shadow-lg transition-all active:scale-95"
            >
              Saber más
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}