import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Header from './components/Navegacion';
import Footer from './components/footer'; 
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';

export default function App() {
  return (
    <BrowserRouter> 
      <Header />
      
      <Routes>
        {/* --- RUTAS PÚBLICAS --- */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} /> 
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/projects" element={<Projects />} />

        {/* --- RUTAS PARA CUALQUIER USUARIO LOGUEADO --- */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/CreatePost" element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>

        {/* --- RUTAS EXCLUSIVAS PARA ADMIN --- */}
        <Route element={<OnlyAdminPrivateRoute />}>
          {/* El Dashboard maneja internamente la pestaña activa capturando el query string */}
          <Route path='/dashboard' element={<Dashboard />} /> 
        </Route>
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}