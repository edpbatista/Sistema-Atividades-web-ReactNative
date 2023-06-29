import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListarCategoria.css';

const ListarCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [editingId, setEditingId] = useState(null);

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

  const handleVoltar = () => {
    navigate('/CadastroCategoria');
  };

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4003/categoria/${id}`);
      fetchCategorias();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setCategorias((prevState) =>
      prevState.map((categoria) =>
        categoria.id === id ? { ...categoria, [name]: value } : categoria
      )
    );
  };

  const handleSalvar = async (id) => {
    try {
      const categoria = categorias.find((categoria) => categoria.id === id);
      await axios.put(`http://localhost:4003/categoria/${id}`, categoria);
      setEditingId(null);
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

  return (
    <div className="container-lista">
      <h1>Lista de Categorias</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>
                {editingId === categoria.id ? (
                  <input
                    type="text"
                    name="nome"
                    value={categoria.nome}
                    onChange={(e) => handleInputChange(e, categoria.id)}
                  />
                ) : (
                  categoria.nome
                )}
              </td>
              <td>
                {editingId === categoria.id ? (
                  <input
                    type="text"
                    name="descricao"
                    value={categoria.descricao}
                    onChange={(e) => handleInputChange(e, categoria.id)}
                  />
                ) : (
                  categoria.descricao
                )}
              </td>
              <td>
                {editingId === categoria.id ? (
                  <React.Fragment>
                    <button className="button" onClick={() => handleSalvar(categoria.id)}>
                      Salvar
                    </button>
                    <button className="button button-space" onClick={() => handleCancelarEdicao()}>
                      Cancelar
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <button className="button" onClick={() => handleEditar(categoria.id)}>
                      Alterar
                    </button>
                    <button className="button button-space" onClick={() => handleDelete(categoria.id)}>
                      Deletar
                    </button>
                  </React.Fragment>
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

export default ListarCategorias;
