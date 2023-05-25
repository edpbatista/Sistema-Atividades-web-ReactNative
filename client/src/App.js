import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Atividade from './pages/atividades/atividades';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import CadastroUsuario from './pages/cadastroUsuario/CadastroUsuario';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    // Realize a lógica de verificação de autenticação aqui
    if (!authenticated) {
      navigate('/');
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Login setAuthenticated={setAuthenticated} />} />
      <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
      <Route path="/home" element={<Home />} />
      <Route path="/atividades" element={<Atividade />} />
    </Routes>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
