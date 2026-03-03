import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'flowbite-react'; 
import { HiOutlineExclamationCircle, HiTrash, HiCheckCircle } from 'react-icons/hi';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  const [loading, setLoading] = useState(true);
  
  // NUEVO ESTADO PARA LA NOTIFICACIÓN
  const [notification, setNotification] = useState(null);

  const currentColor = currentUser?.profileColor || '#4f46e5';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users || []);
          if (data.users?.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };
    if (currentUser?.isAdmin) {
      fetchUsers();
    }
  }, [currentUser?._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...(data.users || [])]);
        if (data.users?.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
        
        // MOSTRAR CARTEL DE ÉXITO
        setNotification('Usuario eliminado con éxito');
        
        // DESAPARECER EL CARTEL DESPUÉS DE 3 SEGUNDOS
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) return (
    <div className='flex justify-center items-center min-h-screen w-full'>
      <Spinner size='xl' />
    </div>
  );

  return (
    <div className='p-3 w-full max-w-6xl mx-auto relative'>
      
      {/* --- CARTEL DE ÉXITO (NOTIFICACIÓN FLOTANTE) --- */}
      {notification && (
        <div className="fixed top-5 right-5 z-[100] flex items-center gap-3 bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-emerald-200 animate-in slide-in-from-right duration-300">
          <HiCheckCircle className="text-2xl" />
          <span className="font-bold uppercase tracking-widest text-xs">{notification}</span>
        </div>
      )}

      <div className='text-center my-10'>
        <h1 className='text-4xl font-black tracking-tight text-slate-800 mb-2'>
          Gestión de <span style={{ color: currentColor }}>Usuarios</span>
        </h1>
        <p className='text-slate-400 text-sm font-semibold uppercase tracking-widest'>Panel de Administración</p>
      </div>

      {currentUser?.isAdmin && users && users.length > 0 ? (
        <>
          <div className='bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/40 border border-slate-100 overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-slate-50 border-b border-slate-100'>
                  <th className="px-6 py-5 text-slate-500 font-black uppercase tracking-widest text-[10px]">Registro</th>
                  <th className="px-6 py-5 text-slate-500 font-black uppercase tracking-widest text-[10px]">Usuario</th>
                  <th className="px-6 py-5 text-slate-500 font-black uppercase tracking-widest text-[10px]">Nombre</th>
                  <th className="px-6 py-5 text-slate-500 font-black uppercase tracking-widest text-[10px]">Email</th>
                  <th className="px-6 py-5 text-slate-500 font-black uppercase tracking-widest text-[10px]">Admin</th>
                  <th className="px-6 py-5 text-slate-500 font-black uppercase tracking-widest text-[10px]">Acción</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100'>
                {users.map((user) => (
                  <tr key={user._id} className='bg-white transition-colors hover:bg-slate-50/50'>
                    <td className='px-6 py-4 font-bold text-slate-500 text-xs'>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shadow-inner' 
                           style={{ backgroundColor: user.profileColor || '#cbd5e1' }}>
                        {user.username ? user.username.charAt(0).toUpperCase() : '?'}
                      </div>
                    </td>
                    <td className='px-6 py-4 font-black text-slate-700'>{user.username}</td>
                    <td className='px-6 py-4 font-medium text-slate-500'>{user.email}</td>
                    <td className='px-6 py-4'>
                      {user.isAdmin ? (
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">Admin</span>
                      ) : (
                        <span className="bg-slate-100 text-slate-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">Lector</span>
                      )}
                    </td>
                    <td className='px-6 py-4'>
                      <button
                        onClick={() => {
                          setUserIdToDelete(user._id);
                          setShowModal(true);
                        }}
                        className='p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors'
                      >
                        <HiTrash size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showMore && (
            <button onClick={handleShowMore} className='w-full text-slate-500 font-black uppercase tracking-widest text-xs py-10 hover:text-indigo-600'>
              Cargar más usuarios
            </button>
          )}
        </>
      ) : (
        <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold">No se encontraron usuarios.</p>
        </div>
      )}

      {/* MODAL PERSONALIZADO */}
      {showModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in duration-200">
            <HiOutlineExclamationCircle className='mx-auto mb-4 text-red-500 h-16 w-16' />
            <h3 className='mb-4 text-xl font-black text-slate-800 uppercase tracking-tight'>¿Eliminar usuario?</h3>
            <p className='text-slate-500 mb-8 font-medium text-sm'>Esta acción es permanente y no se puede deshacer.</p>
            <div className='flex flex-col gap-3'>
              <button 
                onClick={handleDeleteUser}
                className='w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-red-200 uppercase tracking-widest text-[10px]'
              >
                Sí, eliminar usuario
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className='w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all uppercase tracking-widest text-[10px]'
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}