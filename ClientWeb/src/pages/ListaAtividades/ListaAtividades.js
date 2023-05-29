import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListaAtividades.css';

const ListarAtividades = () => {
  const [atividades, setAtividades] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAtividades();
  }, []);

  const fetchAtividades = async () => {
    try {
      const response = await axios.get('http://localhost:4003/atividade');
      setAtividades(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVoltar = () => {
    navigate('/home'); // Redireciona para a página inicial
  };

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4003/atividade/${id}`);
      fetchAtividades();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setAtividades((prevState) =>
      prevState.map((atividade) =>
        atividade.id === id ? { ...atividade, [name]: value } : atividade
      )
    );
  };

  const handleSalvar = async (id) => {
    try {
      const atividade = atividades.find((atividade) => atividade.id === id);
      await axios.put(`http://localhost:4003/atividade/${id}`, atividade);
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
      <h1>Lista de Atividades</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {atividades.map((atividade) => (
            <tr key={atividade.id}>
              <td>
                {editingId === atividade.id ? (
                  <input
                    type="text"
                    name="nome"
                    value={atividade.nome}
                    onChange={(e) => handleInputChange(e, atividade.id)}
                  />
                ) : (
                  atividade.nome
                )}
              </td>
              <td>
                {editingId === atividade.id ? (
                  <input
                    type="text"
                    name="data"
                    value={atividade.data}
                    onChange={(e) => handleInputChange(e, atividade.id)}
                  />
                ) : (
                  atividade.data
                )}
              </td>
              <td>
                {editingId === atividade.id ? (
                  <React.Fragment>
                    <button className="button" onClick={() => handleSalvar(atividade.id)}>
                      Salvar
                    </button>
                    <button className="button button-space" onClick={() => handleCancelarEdicao()}>
                      Cancelar
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <button className="button" onClick={() => handleEditar(atividade.id)}>
                      Alterar
                    </button>
                    <button className="button button-space" onClick={() => handleDelete(atividade.id)}>
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

export default ListarAtividades;
