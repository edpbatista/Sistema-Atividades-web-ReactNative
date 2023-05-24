import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Atividade from './pages/atividades/atividades';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import CadastroUsuario from './pages/cadastroUsuario/CadastroUsuario';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/atividades" element={<Atividade />} />
        <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
