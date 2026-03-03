import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, TextInput, Select, Label } from 'flowbite-react';
import { useSelector } from 'react-redux';

// Imágenes con estética 3D minimalista (Estilo Icono)
const DEFAULT_IMAGES = {
  tech: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000',
  fashion: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000',
  home: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=1000',
  luxury: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=1000',
  uncategorized: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=1000'
};

const BLACK_TEXT_STYLE = { color: 'black', fontWeight: '900' };
const INPUT_STYLE = { color: '#374151', fontWeight: '500' };

export default function CreatePost() {
  const [formData, setFormData] = useState({
    category: 'uncategorized',
    image: DEFAULT_IMAGES.uncategorized
  });
  const [publishError, setPublishError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const userColor = currentUser?.profileColor || '#4f46e5';

  const handleChange = (e) => {
    const { id, value } = e.target;
    
    if (id === 'category') {
      setFormData({ 
        ...formData, 
        category: value, 
        image: DEFAULT_IMAGES[value] || DEFAULT_IMAGES.uncategorized 
      });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPublishError(null);

    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // REDIRECCIÓN ACTUALIZADA: Ahora lleva a la página de Proyectos
      navigate('/projects');
      
    } catch (error) {
      setPublishError(error.message || 'Algo salió mal al publicar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Nuevo <span style={{ color: userColor }}>Producto</span>
          </h1>
          <p className="text-slate-600 font-medium italic">Añade un artículo exclusivo a la colección.</p>
          <div className="h-1.5 w-20 mx-auto mt-4 rounded-full" style={{ backgroundColor: userColor }} />
        </header>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-200 flex flex-col gap-6">
            
            {/* NOMBRE */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-sm uppercase tracking-wider" style={BLACK_TEXT_STYLE}>
                🏷️ NOMBRE DEL PRODUCTO
              </Label>
              <TextInput id="name" type="text" placeholder="Ej: iPhone 15 Pro Max" required style={INPUT_STYLE} onChange={handleChange} />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {/* CATEGORÍA */}
              <div className="flex-1 flex flex-col gap-2">
                <Label htmlFor="category" className="text-sm uppercase tracking-wider" style={BLACK_TEXT_STYLE}>📁 CATEGORÍA</Label>
                <Select id="category" required style={INPUT_STYLE} onChange={handleChange}>
                  <option value="uncategorized">Seleccionar Categoría</option>
                  <option value="tech">Tecnología</option>
                  <option value="fashion">Moda</option>
                  <option value="home">Hogar</option>
                  <option value="luxury">Lujo</option>
                </Select>
              </div>

              {/* PRECIO */}
              <div className="flex-1 flex flex-col gap-2">
                <Label htmlFor="price" className="text-sm uppercase tracking-wider" style={BLACK_TEXT_STYLE}>💰 PRECIO (USD)</Label>
                <TextInput id="price" type="number" placeholder="0.00" required style={INPUT_STYLE} onChange={handleChange} />
              </div>
            </div>

            {/* VISTA PREVIA (Estilizada para renders 3D) */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm uppercase tracking-wider" style={BLACK_TEXT_STYLE}>🖼️ VISTA PREVIA DEL OBJETO</Label>
              <div className="relative h-64 rounded-2xl overflow-hidden border-2 border-slate-100 bg-slate-50 flex items-center justify-center shadow-inner">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="max-h-full max-w-full object-contain p-6 transition-all duration-500 hover:scale-110" 
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-slate-200/30 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* DESCRIPCIÓN */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="description" className="text-sm uppercase tracking-wider" style={BLACK_TEXT_STYLE}>📝 DESCRIPCIÓN</Label>
              <textarea
                id="description"
                required
                className="w-full p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 min-h-[120px] transition-all bg-white font-medium"
                style={{ color: '#374151' }}
                placeholder="Detalles del producto..."
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl transition-all duration-300 shadow-lg text-white font-black uppercase tracking-widest text-sm ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}
              style={{ background: `linear-gradient(135deg, ${userColor} 0%, #000000 100%)` }}
            >
              {loading ? 'Publicando...' : '🚀 Publicar en Catálogo'}
            </button>

            {publishError && <Alert color="failure" className="mt-4 font-bold">⚠️ {publishError}</Alert>}
          </div>
        </form>
      </div>
    </div>
  );
}