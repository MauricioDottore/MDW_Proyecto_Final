import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import DashProfile from '../components/DashProfile';
import DashUsers from '../components/DashUsers';
import DashStats from '../components/DashStats';

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState('');
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }

    // --- LÓGICA DE SEGURIDAD REFORZADA ---
    // Definimos qué pestañas son exclusivas para Administradores
    const adminOnlyTabs = ['users', 'stats'];

    if (adminOnlyTabs.includes(tabFromUrl) && !currentUser?.isAdmin) {
      // Si intenta entrar a una zona Prohibida, lo movemos a su perfil
      navigate('/dashboard?tab=profile');
    }
  }, [location.search, currentUser, navigate]);

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* Sidebar: Si en el futuro agregas un componente <DashSidebar />, 
         debería ir aquí para que aparezca a la izquierda en escritorio.
      */}
      
      {/* Contenido principal */}
      <div className='w-full p-4 md:p-8 bg-slate-50/50'>
        
        {/* 1. Perfil del usuario (Disponible para todos) */}
        {tab === 'profile' && <DashProfile />}
        
        {/* 2. Gestión de Usuarios (Solo Admins) */}
        {tab === 'users' && currentUser?.isAdmin && <DashUsers />}
        
        {/* 3. Estadísticas del Dashboard (Solo Admins) */}
        {tab === 'stats' && currentUser?.isAdmin && <DashStats />}

        {/* Si el usuario entra a /dashboard sin parámetros, 
           podrías renderizar por defecto el perfil o un resumen 
        */}
        {!tab && <DashProfile />}
      </div>
    </div>
  );
}