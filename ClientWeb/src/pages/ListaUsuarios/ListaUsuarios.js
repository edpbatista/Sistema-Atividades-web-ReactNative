import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListaUsuarios.css';

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:4003/usuarios');
      setUsuarios(response.data);
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
      await axios.delete(`http://localhost:4003/usuario/${id}`);
      fetchUsuarios();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setUsuarios((prevState) =>
      prevState.map((usuario) =>
        usuario.id === id ? { ...usuario, [name]: value } : usuario
      )
    );
  };

  const handleSalvar = async (id) => {
    try {
      const usuario = usuarios.find((usuario) => usuario.id === id);
      await axios.put(`http://localhost:4003/usuario/${id}`, usuario);
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
      <h1>Lista de Usuários</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Nome de Usuário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>
                {editingId === usuario.id ? (
                  <input
                    type="text"
                    name="nome"
                    value={usuario.nome}
                    onChange={(e) => handleInputChange(e, usuario.id)}
                  />
                ) : (
                  usuario.nome
                )}
              </td>
              <td>
                {editingId === usuario.id ? (
                  <input
                    type="text"
                    name="nomeDeUsuario"
                    value={usuario.nomeDeUsuario}
                    onChange={(e) => handleInputChange(e, usuario.id)}
                  />
                ) : (
                  usuario.nomeDeUsuario
                )}
              </td>
              <td>
                {editingId === usuario.id ? (
                  <React.Fragment>
                    <button className="button" onClick={() => handleSalvar(usuario.id)}>
                      Salvar
                    </button>
                    <button className="button button-space" onClick={() => handleCancelarEdicao()}>
                      Cancelar
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <button className="button" onClick={() => handleEditar(usuario.id)}>
                      Alterar
                    </button>
                    <button className="button button-space" onClick={() => handleDelete(usuario.id)}>
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

export default ListarUsuarios;
