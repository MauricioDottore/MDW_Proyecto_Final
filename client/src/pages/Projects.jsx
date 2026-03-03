import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HiPlus } from 'react-icons/hi';

const DEFAULT_ICONS = {
  tech: '💻',
  home: '🏠',
  fashion: '🧥',
  luxury: '💎',
  Todos: '📦'
};

export default function Projects() {
  const { currentUser } = useSelector((state) => state.user || {});
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'

  const currentColor = currentUser?.profileColor || '#4f46e5';

  // 1. Cargar productos desde la API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/post/getposts');
      const data = await res.json();
      if (res.ok) {
        setProducts(data.posts);
      }
    } catch (error) {
      console.log("Error al obtener productos:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Función para eliminar un producto
  const handleDelete = async (postId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) return;
    try {
      const res = await fetch(`/api/post/deletepost/${postId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((post) => post._id !== postId));
      } else {
        const data = await res.json();
        alert(data.message || "Error al eliminar");
      }
    } catch (error) {
      console.log("Error al eliminar:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 3. Lógica de filtrado por categoría
  const filteredProducts = filter === 'Todos' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 relative">
      
      {/* --- BOTÓN FLOTANTE "+" (PARA CUALQUIER USUARIO LOGUEADO) --- */}
      {currentUser && (
        <Link 
          to='/CreatePost' 
          className="fixed bottom-10 right-10 z-[60] group transition-transform active:scale-90"
        >
          <div 
            style={{ 
              background: `linear-gradient(135deg, ${currentColor} 0%, #000000 100%)` 
            }}
            className="w-16 h-16 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-indigo-200 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <HiPlus className="text-white text-3xl font-black transition-transform duration-500 group-hover:rotate-90 relative z-10" />
          </div>
          
          <span className="absolute right-20 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl whitespace-nowrap">
            Publicar Producto
          </span>
        </Link>
      )}

      {/* --- HEADER --- */}
      <div className="max-w-7xl mx-auto px-6 pt-12 flex justify-between items-end gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Explorar <span style={{ color: currentColor }}>Productos</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium italic">Encuentra o publica lo que necesites</p>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setViewMode('grid')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            Cuadrícula
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'list' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            Lista
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-12">
        {/* --- SIDEBAR --- */}
        <aside className="w-full md:w-64 space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Categorías</h3>
          <div className="flex flex-col gap-1">
            {['Todos', 'tech', 'home', 'fashion', 'luxury'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-left px-5 py-3.5 rounded-2xl transition-all text-sm font-bold flex items-center ${filter === cat ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                <span className="mr-3 text-lg leading-none">{DEFAULT_ICONS[cat] || '📦'}</span>
                <span className="capitalize">{cat === 'tech' ? 'Tecnología' : cat === 'home' ? 'Hogar' : cat === 'fashion' ? 'Moda' : cat === 'luxury' ? 'Lujo' : cat}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* --- CONTENIDO --- */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1,2,3,4,5,6].map(n => <div key={n} className="h-72 bg-slate-200 animate-pulse rounded-[2.5rem]" />)}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-[2.5rem] py-20 text-center border-2 border-dashed border-slate-200 shadow-sm">
               <span className="text-5xl mb-4 block">🔍</span>
               <p className="text-slate-400 font-bold">No hay resultados aquí.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div key={product._id} className="group relative bg-white rounded-[2.5rem] p-4 border border-slate-100 hover:shadow-2xl hover:shadow-indigo-100/40 transition-all duration-500">
                  
                  {/* ACCIONES CONDICIONALES */}
                  {(currentUser?.isAdmin || currentUser?._id === product.userId) && (
                    <div className="absolute top-6 right-6 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                      <Link to={`/update-post/${product._id}`} className="p-3 bg-white/90 backdrop-blur rounded-full shadow-xl text-slate-600 hover:text-indigo-600 hover:scale-110 transition-all">✏️</Link>
                      <button onClick={() => handleDelete(product._id)} className="p-3 bg-white/90 backdrop-blur rounded-full shadow-xl text-slate-600 hover:text-red-600 hover:scale-110 transition-all">🗑️</button>
                    </div>
                  )}

                  <div className="aspect-square rounded-[2rem] bg-slate-50 flex items-center justify-center mb-6 overflow-hidden border border-slate-50">
                    {product.image ? (
                        <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
                    ) : (
                        <span className="text-7xl drop-shadow-md">{DEFAULT_ICONS[product.category] || '📦'}</span>
                    )}
                  </div>
                  <div className="px-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">{product.category}</span>
                      {product.userId === currentUser?._id && <span className="text-[8px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-bold uppercase">Mío</span>}
                    </div>
                    <h2 className="text-lg font-bold text-slate-800 truncate mb-1">{product.name}</h2>
                    <p className="text-2xl font-black text-slate-900">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <th className="px-8 py-6">Producto</th>
                    <th className="px-8 py-6">Precio</th>
                    <th className="px-8 py-6">Publicado por</th>
                    <th className="px-8 py-6 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-indigo-50/30 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl shrink-0 border border-slate-100 shadow-sm overflow-hidden">
                            {product.image ? <img src={product.image} className="w-full h-full object-cover" alt="" /> : DEFAULT_ICONS[product.category]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800 line-clamp-1">{product.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">ID: {product._id.slice(-6)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-lg font-black text-slate-900">${product.price}</td>
                      <td className="px-8 py-5">
                        <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${product.userId === currentUser?._id ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                          {product.userId === currentUser?._id ? "Mi publicación" : "Usuario Externo"}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex justify-center gap-4">
                           {(currentUser?.isAdmin || currentUser?._id === product.userId) ? (
                             <>
                               <Link to={`/update-post/${product._id}`} className="p-2 hover:bg-white rounded-xl shadow-sm hover:scale-125 transition-all">✏️</Link>
                               <button onClick={() => handleDelete(product._id)} className="p-2 hover:bg-white rounded-xl shadow-sm hover:scale-125 transition-all text-red-500">🗑️</button>
                             </>
                           ) : (
                             <span className="text-[10px] font-black text-slate-300 uppercase italic">Solo lectura</span>
                           )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}