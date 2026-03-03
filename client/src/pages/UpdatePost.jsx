import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdatePost() {
  const [formData, setFormData] = useState({});
  const { postId } = useParams();
  const navigate = useNavigate();

  // 1. Cargar los datos actuales del producto
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (res.ok) {
          // Buscamos el post específico en el array que devuelve tu getposts
          const postToEdit = data.posts.find(p => p._id === postId);
          setFormData(postToEdit);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [postId]);

  // 2. Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Producto actualizado con éxito");
        navigate('/projects'); // Redirigir al inventario
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-black text-slate-800">Editar Producto</h1>
      <form className="flex flex-col gap-4 bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input 
            type="text" placeholder="Nombre" required className="flex-1 p-3 rounded-xl border border-slate-200 outline-indigo-500"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name || ''}
          />
          <select 
            className="p-3 rounded-xl border border-slate-200"
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            value={formData.category || 'uncategorized'}
          >
            <option value="tech">Tecnología</option>
            <option value="home">Hogar</option>
            <option value="fashion">Moda</option>
            <option value="luxury">Lujo</option>
          </select>
        </div>
        <input 
          type="number" placeholder="Precio" required className="p-3 rounded-xl border border-slate-200"
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          value={formData.price || ''}
        />
        <textarea 
          placeholder="Descripción" required className="p-3 rounded-xl border border-slate-200 h-32"
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          value={formData.description || ''}
        />
        <button type="submit" className="bg-indigo-600 text-white p-4 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}