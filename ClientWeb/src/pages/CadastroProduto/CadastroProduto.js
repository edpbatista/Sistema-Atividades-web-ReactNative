import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import './CadastroProduto.css';
import { useNavigate } from 'react-router-dom';

const CadastroProduto = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate('/home');
  };

  const handleListarProdutos = () => {
    navigate('/listarProduto');
  };

  const schema = Yup.object().shape({
    nome: Yup.string().required('O nome do produto é obrigatório'),
    descricao: Yup.string().required('A descrição do produto é obrigatória'),
    preco: Yup.number().required('O preço do produto é obrigatório'),
    categoriaId: Yup.string().required('Selecione uma categoria'),
  });

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:4003/categorias');
      setCategorias(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCadastro = async () => {
    try {
      await schema.validate(
        { nome, descricao, preco, categoriaId },
        { abortEarly: false }
      );

      // Se a validação for bem-sucedida, continuar com o cadastro

      const response = await axios.post('http://localhost:4003/produto', {
        nome,
        descricao,
        preco,
        categoriaId,
      });

      console.log(response.data);
      // Exibir mensagem de sucesso
      setSuccessMessage('Produto cadastrado com sucesso!');
      setErrorMessage('');

      // Limpar os campos após o cadastro bem-sucedido
      setNome('');
      setDescricao('');
      setPreco('');
      setCategoriaId('');

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
        setErrorMessage('Ocorreu um erro ao cadastrar o produto. Por favor, tente novamente.');
        setSuccessMessage('');
      }
    }
  };

  return (
    <div className="CadastroProduto">
      <h2>Cadastro de Produto</h2>
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
        <div>
          <label htmlFor="preco">Preço:</label>
          <input
            type="text"
            id="preco"
            value={preco}
            onChange={(e) => setPreco(e.target.value.replace(",", "."))}
          />        </div>
        <div>
          {errors.preco && <span className="error">{errors.preco}</span>}
        </div>
        <div>
          <label htmlFor="categoria">Categoria:</label>
          <select
            id="categoria"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          {errors.categoriaId && <span className="error">{errors.categoriaId}</span>}
        </div>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <br />
        <button type="button" onClick={handleCadastro}>
          Cadastrar Produto
        </button>
        <br />
        <button type="button" onClick={handleListarProdutos}>
          Listar Produtos
        </button>
        <br></br>
        <button type="button" onClick={handleVoltar}>
          Voltar
        </button>
      </form>
    </div>
  );
};

export default CadastroProduto;
