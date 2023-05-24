import React from "react";
import "./Home.css";

const Home = () => {

  return (
    <div className="containerHome">
      <div className="menu">
        <div className="logo">
          <a href="/">Sistema de atividades</a>
        </div>
        <ul>
          <li>
            <a href="/atividades">Atividade</a>
          </li>
          <li>
            <a href="/cadastroUsuario">Cadastrar Usuário</a>
          </li>
          <li>
            <a href="/">Sair</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
