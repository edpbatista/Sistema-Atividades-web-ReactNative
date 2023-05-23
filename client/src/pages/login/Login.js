import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setIsLoggedIn }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4003/usuarios', {
        usuario,
        senha,
      });

      // Lógica de autenticação aqui
      if (response.data.success) {
        // Login bem-sucedido, atualiza o estado de autenticação
        setIsLoggedIn(true);
      } else {
        // Exibir mensagem de erro
        setErro(response.data.message);
      }
    } catch (error) {
      console.error(error);
      // Exibir mensagem de erro genérico
      setErro('Ocorreu um erro durante o login');
    }
  };

  const handleChangeUsuario = (e) => {
    setUsuario(e.target.value);
  };

  const handleChangeSenha = (e) => {
    setSenha(e.target.value);
  };

  return (
    <div>
      <h2>Tela de Login</h2>
      <form>
        <div>
          <label htmlFor="usuario">Usuário:</label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={handleChangeUsuario}
          />
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={handleChangeSenha}
          />
        </div>
        {erro && <p className="error-message">{erro}</p>}
        <button type="button" onClick={handleLogin}>
          Entrar
        </button>
      </form>
      <p>
        Se você ainda não possui uma conta,{' '}
        <a href="/cadastroUsuario">clique aqui</a> para se cadastrar.
      </p>
    </div>
  );
};

export default Login;
