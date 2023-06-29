import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import './Atividade.css';

function CreateAtividade() {
  const [nome, setNome] = useState('');
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate('/home'); // Redireciona para a página inicial
  };

  const handleListarAtividades = () => {
    navigate('/listarAtividade'); // Redireciona para a página inicial
  };

  const schema = Yup.object().shape({
    nome: Yup.string().required('O nome da atividade é obrigatório'),
    data: Yup.date().required('A data da atividade é obrigatória'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate({ nome, data }, { abortEarly: false });
  
      const formattedData = data.toISOString().split('T')[0]; // Formata a data para ISO 8601
  
      const response = await axios.post('http://localhost:4003/atividade', {
        nome,
        data: formattedData, // Envia somente a data formatada
      });
  
      console.log(response.data);
      setSuccessMessage('Atividade criada com sucesso!');
      setErrorMessage('');
  
      setNome('');
      setData(null);
  
      setErrors({}); // Limpar os erros
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
      } else {
        console.error(error);
        setErrorMessage(
          'Ocorreu um erro ao criar a atividade. Por favor, tente novamente.'
        );
        setSuccessMessage('');
      }
    }
  };

  return (
    <div className='CreateAtividade'>
      <h2>Criar Atividade</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type='text'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div>
          {errors.nome && <span className='input-error'>{errors.nome}</span>}
        </div>
        <div>
          <label>Data:</label>
          <input
            type='date'
            value={data ? data.toISOString().split('T')[0] : ''}
            onChange={(e) => setData(new Date(e.target.value))}
          />
        </div>
        <div>
          {errors.data && <span className='input-error'>{errors.data}</span>}
        </div>
        {successMessage && <div className='success-message'>{successMessage}</div>}
        {errorMessage && <div className='error-message'>{errorMessage}</div>}
        <button type='submit'>Criar</button>
        <br></br>
        <button type='button' onClick={handleListarAtividades}>
          Lista de atividades
        </button>
        <br></br>
        <button type='button' onClick={handleVoltar}>
          Voltar
        </button>
      </form>
    </div>
  );
  
  
}

export default CreateAtividade;
