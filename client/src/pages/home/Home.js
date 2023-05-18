import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="containerHome">
      <div className="contentHome">
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <div className="middle">
              <button className="btnHome" onClick={() => navigate("/atividades")}>
                Atividade
              </button>
              <button className="btnSairHome" onClick={() => navigate("/")}>
                Sair
              </button>
            </div>
          </div>
          <div className="col-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
