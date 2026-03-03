import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineUserGroup, HiOutlineCube, HiOutlineCurrencyDollar, HiOutlineChartPie } from 'react-icons/hi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

export default function DashStats() {
  const { currentUser } = useSelector((state) => state.user);
  const userColor = currentUser?.profileColor || '#4f46e5';
  
  // Estados para datos reales
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 1. Obtener Usuarios
        const resUsers = await fetch('/api/user/getusers?limit=5');
        const dataUsers = await resUsers.json();
        
        // 2. Obtener Posts/Productos
        const resPosts = await fetch('/api/post/getposts');
        const dataPosts = await resPosts.json();

        if (resUsers.ok && resPosts.ok) {
          setTotalUsers(dataUsers.totalUsers || 0);
          setTotalPosts(dataPosts.totalPosts || 0);

          // Calcular valor total del inventario y datos para el gráfico
          const posts = dataPosts.posts || [];
          const totalSum = posts.reduce((acc, post) => acc + (Number(post.price) || 0), 0);
          setTotalValue(totalSum);

          // Agrupar por categorías para el gráfico
          const counts = posts.reduce((acc, post) => {
            const cat = post.category || 'otros';
            acc[cat] = (acc[cat] || 0) + 1;
            return acc;
          }, {});

          const formattedChartData = Object.keys(counts).map(key => ({
            name: key.toUpperCase(),
            cantidad: counts[key]
          }));

          setCategoryData(formattedChartData);
        }
      } catch (error) {
        console.error("Error cargando stats:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.isAdmin) {
      fetchStats();
    }
  }, [currentUser]);

  if (loading) return <div className="flex justify-center items-center min-h-[400px] font-bold text-slate-500 animate-pulse">Cargando métricas reales...</div>;

  return (
    <div className='p-4 md:p-8 w-full max-w-7xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-black text-slate-800 tracking-tighter uppercase'>
          Análisis <span style={{ color: userColor }}>Real</span>
        </h1>
        <p className='text-slate-500 font-medium italic underline decoration-indigo-200'>Datos extraídos directamente de tu base de datos.</p>
      </div>

      {/* --- TARJETAS CON DATOS REALES --- */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
        <StatCard title="Usuarios Registrados" value={totalUsers} icon={HiOutlineUserGroup} color="bg-indigo-600" />
        <StatCard title="Total Productos" value={totalPosts} icon={HiOutlineCube} color="bg-pink-500" />
        <StatCard title="Valor Inventario" value={`$${totalValue.toLocaleString()}`} icon={HiOutlineCurrencyDollar} color="bg-emerald-500" />
      </div>

      {/* --- SECCIÓN DE GRÁFICOS BASADOS EN CATEGORÍAS --- */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        
        {/* Gráfico de Distribución por Categoría */}
        <div className='lg:col-span-2 bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100'>
          <div className='flex justify-between items-center mb-8 px-2'>
            <div>
              <h3 className='font-black text-slate-700 uppercase tracking-widest text-sm'>Distribución de Inventario</h3>
              <p className='text-xs text-slate-400 font-bold'>Cantidad de productos por categoría</p>
            </div>
            <HiOutlineChartPie size={24} className='text-slate-300' />
          </div>
          <div className='h-[350px] w-full'>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={categoryData}>
                <defs>
                  <linearGradient id="colorCat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={userColor} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={userColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 'bold'}} />
                <YAxis hide={true} />
                <Tooltip 
                  cursor={{ stroke: userColor, strokeWidth: 2 }}
                  contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="stepAfter" dataKey="cantidad" stroke={userColor} strokeWidth={4} fillOpacity={1} fill="url(#colorCat)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mini Comparativa de Volumen */}
        <div className='bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col'>
          <h3 className='font-black text-slate-700 uppercase tracking-widest text-sm mb-8'>Volumen</h3>
          <div className='flex-1 w-full'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <Bar dataKey="cantidad" radius={[12, 12, 12, 12]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? userColor : '#cbd5e1'} />
                  ))}
                </Bar>
                <Tooltip cursor={{fill: 'transparent'}} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className='mt-6 p-5 bg-slate-50 rounded-[2rem] border border-slate-100'>
             <p className='text-[10px] font-black text-slate-400 text-center uppercase tracking-tighter'>
               Total de artículos analizados: {totalPosts}
             </p>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className='bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50 hover:border-slate-200 transition-all duration-300'>
      <div className='flex justify-between items-center mb-4'>
        <div className={`p-4 rounded-2xl text-white shadow-lg ${color} bg-opacity-90`}>
          <Icon size={28} />
        </div>
      </div>
      <div>
        <h3 className='text-slate-400 text-xs font-black uppercase tracking-widest mb-1'>{title}</h3>
        <p className='text-4xl font-black text-slate-800 tracking-tight'>{value}</p>
      </div>
    </div>
  );
}