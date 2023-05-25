import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="containerHome">
      <div className="menu">
        <div className="logo">
          <Link to="/">Sistema de atividades</Link>
        </div>
        <ul>
          <li>
            <Link to="/atividades">Cadastro de Atividade</Link>
          </li>
          <li>
            <Link to="/listarAtividade">Lista Atividade</Link>
          </li>
          <li>
            <Link to="/cadastroUsuario">Cadastrar Usuário</Link>
          </li>
          <li>
            <Link to="/">Sair</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
