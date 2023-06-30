import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListarProduto.css';

const ListarProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetchProdutos();
    fetchCategorias();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:4003/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:4003/categorias');
      setCategorias(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVoltar = () => {
    navigate('/cadastroProduto');
  };

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4003/produto/${id}`);
      fetchProdutos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setProdutos((prevState) =>
      prevState.map((produto) =>
        produto.id === id ? { ...produto, [name]: value } : produto
      )
    );
  };

  const handleSalvar = async (id) => {
    try {
      const produto = produtos.find((produto) => produto.id === id);
      const { nome, descricao, categoriaId, preco } = produto;

      await axios.put(`http://localhost:4003/produto/${id}`, {
        nome,
        descricao,
        categoriaId,
        preco: parseFloat(preco) // Converter a string em um número de ponto flutuante
      });

      setEditingId(null);
      fetchProdutos();
    } catch (error) {
      console.error(error);
    }
  };



  const handleCancelarEdicao = () => {
    setEditingId(null);
  };

  const handleEditar = (id) => {
    setEditingId(id);
  };

  useEffect(() => {
    if (editingId !== null) {
      fetchProdutos();
    }
  }, [editingId]);

  return (
    <div className="container-lista">
      <h1>Lista de Produtos</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Preço</th> {/* Adicionado aqui */}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>
                {editingId === produto.id ? (
                  <input
                    type="text"
                    name="nome"
                    value={produto.nome}
                    onChange={(e) => handleInputChange(e, produto.id)}
                  />
                ) : (
                  produto.nome
                )}
              </td>
              <td>
                {editingId === produto.id ? (
                  <input
                    type="text"
                    name="descricao"
                    value={produto.descricao}
                    onChange={(e) => handleInputChange(e, produto.id)}
                  />
                ) : (
                  produto.descricao
                )}
              </td>
              <td>
                {editingId === produto.id ? (
                  <select
                    name="categoriaId"
                    value={produto.categoriaId}
                    onChange={(e) => handleInputChange(e, produto.id)}
                  >
                    <option value="">Selecione uma categoria</option>
                    {categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nome}
                      </option>
                    ))}
                  </select>
                ) : (
                  categorias.find((categoria) => categoria.id === produto.categoriaId)?.nome
                )}
              </td>
              <td>
                {editingId === produto.id ? (
                  <input
                    type="text"
                    name="preco"
                    value={produto.preco}
                    onChange={(e) => handleInputChange(e, produto.id)}
                    className="inputPreco"
                  />
                ) : (
                  produto.preco
                )}
              </td>

              <td>
                {editingId === produto.id ? (
                  <>
                    <button className="button" onClick={() => handleSalvar(produto.id)}>
                      Salvar
                    </button>
                    <button className="button button-space" onClick={() => handleCancelarEdicao()}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button className="button" onClick={() => handleEditar(produto.id)}>
                      Alterar
                    </button>
                    <button className="button button-space" onClick={() => handleDelete(produto.id)}>
                      Deletar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button type="button" className="buttonVoltar" onClick={handleVoltar}>
          Voltar
        </button>
      </div>
    </div>

  );
};

export default ListarProdutos;
