import React, { useState } from 'react';
import axios from 'axios';

function CreateAtividade() {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');

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
    <div>
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
    </form>
  </div>
  );
}

export default CreateAtividade;