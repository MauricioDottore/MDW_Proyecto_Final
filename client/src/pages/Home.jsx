import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Importamos para leer el estado del usuario

export default function Home() {
  const [products, setProducts] = useState([]);
  
  // Extraemos al usuario actual desde Redux
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/post/getposts'); // Actualicé a tu ruta real de posts
        const data = await res.json();
        if (res.ok) {
          setProducts(data.posts);
        }
      } catch (error) {
        console.log("Error al traer productos:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      {/* SECTION: HERO */}
      <section className="relative h-[60vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover" 
            alt="Banner Buypedia"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-4">
            BUY<span className="text-indigo-500">PEDIA</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-xl mx-auto mb-8">
            Curaduría de productos premium para un estilo de vida moderno.
          </p>

          {/* LÓGICA CONDICIONAL: Solo muestra "Únete" si NO hay usuario */}
          {!currentUser ? (
            <Link 
              to="/sign-up" 
              className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Únete a la comunidad
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-4">
               <span className="text-white font-medium text-lg">
                 ¡Bienvenido de nuevo, <span className="text-indigo-400 font-bold">{currentUser.username}</span>!
               </span>
               {currentUser.isAdmin && (
                 <Link to="/projects" className="text-indigo-400 hover:text-indigo-300 font-bold underline">
                   Ir al Panel de Inventario
                 </Link>
               )}
            </div>
          )}
        </div>
      </section>

      {/* SECTION: CATALOGO */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Tendencias</h2>
            <div className="h-1 w-12 bg-indigo-600 mt-2"></div>
          </div>
          <p className="text-slate-500 hidden sm:block">Mostrando {products.length} productos exclusivos</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl bg-slate-100 aspect-[4/5] mb-4">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors z-10"></div>
                  <img 
                    src={product.image || "https://via.placeholder.com/400x500"} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-300 z-20">
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-slate-500 text-sm mb-1">{product.category}</p>
                <p className="text-indigo-600 font-bold text-xl">${product.price}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl">
              <p className="text-slate-400">No hay productos disponibles por ahora.</p>
              {!currentUser && (
                <Link to="/sign-in" className="text-indigo-600 font-bold hover:underline">Accede para ver más</Link>
              )}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-slate-50 border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          <p>© 2026 Buypedia. Proyecto de Metodologías Web.</p>
        </div>
      </footer>
    </div>
  );
}