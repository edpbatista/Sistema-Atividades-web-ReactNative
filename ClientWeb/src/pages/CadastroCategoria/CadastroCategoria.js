import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import './CadastroCategoria.css';
import { useNavigate } from 'react-router-dom';

const CadastroCategoria = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate('/home');
  };

  const handleListarCategorias = () => {
    navigate('/listarCategoria');
  };

  const schema = Yup.object().shape({
    nome: Yup.string().required('O nome da categoria é obrigatório'),
    descricao: Yup.string().required('A descrição da categoria é obrigatória'),
  });

  const handleCadastro = async () => {
    try {
      await schema.validate(
        { nome, descricao },
        { abortEarly: false }
      );

      // Se a validação for bem-sucedida, continuar com o cadastro

      const response = await axios.post('http://localhost:4003/categoria', {
        nome,
        descricao,
      });

      console.log(response.data);
      // Exibir mensagem de sucesso
      setSuccessMessage('Categoria cadastrada com sucesso!');
      setErrorMessage('');

      // Limpar os campos após o cadastro bem-sucedido
      setNome('');
      setDescricao('');

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
      } else {
        console.error(error);
        // Exibir mensagem de erro
        setErrorMessage('Ocorreu um erro ao cadastrar a categoria. Por favor, tente novamente.');
        setSuccessMessage('');
      }
    }
  };

  return (
    <div className="CadastroCategoria">
      <h2>Cadastro de Categoria</h2>
      <form>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div>
          {errors.nome && <span className="error">{errors.nome}</span>}
        </div>
        <div>
          <label htmlFor="descricao">Descrição:</label>
          <input
            type="text"
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <div>
          {errors.descricao && <span className="error">{errors.descricao}</span>}
        </div>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <br />
        <button type="button" onClick={handleCadastro}>
          Cadastrar Categoria
        </button>
        <br />
        <button type="button" onClick={handleListarCategorias}>
          Listar Categorias
        </button>
        <br></br>
        <button type="button" onClick={handleVoltar}>
          Voltar
        </button>
      </form>
    </div>
  );
};

export default CadastroCategoria;
