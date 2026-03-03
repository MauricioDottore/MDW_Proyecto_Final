import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* 1. SECCIÓN SUPERIOR */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
          Nacimos para <span className="text-indigo-600">innovar.</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          Buypedia es la fusión perfecta entre diseño de vanguardia y arquitectura de software robusta.
        </p>
      </div>

      {/* 2. BENTO GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-full">
          
          {/* Bloque Grande: Icono 9xl y estático */}
          <div className="md:col-span-2 md:row-span-2 bg-indigo-600 rounded-[2rem] p-10 text-white flex flex-col justify-end relative overflow-hidden group">
            {/* Icono agrandado a 9xl y sin animaciones de rebote */}
            <div className="absolute top-0 right-0 p-8 opacity-20 text-[12rem] transition-transform duration-500 group-hover:scale-110">
              🛒
            </div>
            <h2 className="text-4xl font-bold mb-4 relative z-10">La nueva era del E-commerce</h2>
            <p className="text-indigo-100 relative z-10 text-lg">
              Desarrollamos una experiencia de usuario fluida, donde cada clic está optimizado para la velocidad y la seguridad.
            </p>
          </div>

          {/* Bloque: Tecnología */}
          <div className="md:col-span-2 bg-slate-100 dark:bg-slate-800 rounded-[2rem] p-8 flex flex-col justify-center border border-transparent hover:border-indigo-500 transition-all group">
            <div className="flex justify-between items-center">
               <div className="max-w-[70%]">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Full Stack MERN</h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    MongoDB, Express, React y Node.js trabajando en armonía.
                  </p>
               </div>
               {/* Icono lateral agrandado */}
               <span className="text-7xl opacity-80 group-hover:rotate-12 transition-transform duration-300">💻</span>
            </div>
          </div>

          {/* Bloque: Seguridad - Icono 6xl */}
          <div className="bg-slate-900 dark:bg-indigo-900 rounded-[2rem] p-8 text-white flex flex-col items-center justify-center text-center group">
            <span className="text-7xl mb-4 transition-transform duration-300 group-hover:scale-110">🔐</span>
            <h4 className="font-bold text-xl">Seguridad JWT</h4>
          </div>

          {/* Bloque: Performance - Icono 6xl estático */}
          <div className="bg-indigo-50 dark:bg-slate-700 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center group">
            {/* Eliminada la clase animate-bounce */}
            <span className="text-7xl mb-4 transition-transform duration-300 group-hover:scale-110">⚡</span>
            <h4 className="font-bold text-xl text-indigo-900 dark:text-indigo-300">Ultra Rápido</h4>
          </div>
        </div>
      </section>

      {/* 3. SECCIÓN EQUIPO / VISIÓN */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6 uppercase">Transparencia Total</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-lg">
              Nuestra integración directa con el Backend permite que los productos que ves sean reales y actualizados en tiempo real mediante nuestro sistema CRUD.
            </p>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-bold dark:text-slate-300">#ReactJS</div>
              <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-bold dark:text-slate-300">#TailwindCSS</div>
              <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-bold dark:text-slate-300">#NodeJS</div>
            </div>
          </div>
          {/* Icono del final agrandado a 9xl y estático */}
          <div className="flex-1 w-full bg-gradient-to-tr from-indigo-500 to-purple-600 aspect-video rounded-[3rem] shadow-2xl flex items-center justify-center text-white group">
            <span className="text-[10rem] transition-transform duration-500 group-hover:scale-105">🚀</span>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <div className="bg-indigo-600 py-16 text-center text-white">
        <h2 className="text-4xl font-bold mb-6">¿Quieres ver la magia en acción?</h2>
        <Link to="/sign-up" className="bg-white text-indigo-600 px-10 py-4 rounded-full font-bold hover:shadow-xl transition-all inline-block hover:scale-105">
          Registrate Ahora
        </Link>
      </div>
    </div>
  );
}