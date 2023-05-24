import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Atividade.css";

function CreateAtividade() {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');

  const handleVoltar = () => {
    navigate('/home'); // Redireciona para a página inicial
  };

  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4003/atividade', {
        nome,
        data,
      });

      console.log(response.data);
      // Faça algo com a resposta do servidor, se necessário

      // Reinicie os campos do formulário
      setNome('');
      setData('');
    } catch (error) {
      console.error(error);
      // Trate o erro, se necessário
    }
  };

  return (
    <div className='CreateAtividade'>
    <h2>Criar Atividade</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div>
        <label>Data:</label>
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>
      <button type="submit">Criar</button>
      <br></br>
        <button type="button" onClick={handleVoltar}>
          Voltar
        </button>
    </form>
  </div>
  );
}

export default CreateAtividade;