import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Atividade from './pages/Cadastroatividades/atividades';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import CadastroUsuario from './pages/cadastroUsuario/CadastroUsuario';
import ListarAtividades from './pages/ListaAtividades/ListaAtividades';
import ListarUsuarios from './pages/ListaUsuarios/ListaUsuarios';
import CadastroCategoria from './pages/CadastroCategoria/CadastroCategoria';
import CadastroProduto from './pages/CadastroProduto/CadastroProduto';
import ListarProdutos from './pages/ListarProdutos/ListarProdutos';
import ListarCategorias from './pages/ListarCategoria/ListarCategoria';


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
      <Route path="/home" element={<Home />} />

      <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
      <Route path="/CadastroCategoria" element={<CadastroCategoria />} />
      <Route path="/CadastroProduto" element={<CadastroProduto />} />
      <Route path="/atividades" element={<Atividade />} />

      <Route path="/listarAtividade" element={<ListarAtividades />} />
      <Route path="/listarUsuario" element={<ListarUsuarios />} />
      <Route path="/listarCategoria" element={<ListarCategorias />} />
      <Route path="/listarProduto" element={<ListarProdutos />} />

    </Routes>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
