import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import "./Login.css"

const loginSchema = Yup.object().shape({
  usuario: Yup.string().required('O campo usuário é obrigatório'),
  senha: Yup.string().required('O campo senha é obrigatório'),
});

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Validar campos usando Yup
      await loginSchema.validate({ usuario, senha }, { abortEarly: false });

      const response = await axios.post('http://localhost:4003/login', {
        usuario,
        senha,
      });

      if (response.status === 200) {
        const { success } = response.data;
        if (success) {
          // Autenticação bem-sucedida, redirecionar para a página /home
          window.location.href = '/home';
        } else {
          // Exibir mensagem de erro
          const { message } = response.data;
          setErro(message);
        }
      } else {
        // Exibir mensagem de erro genérica
        setErro('Senha ou usuario invalido');
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        // Erros de validação do Yup
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErro(validationErrors);
      } else {
        // Erro genérico
        console.error(error);
        setErro('Ocorreu um erro durante o login');
      }
    }
  };

  const handleChangeUsuario = (e) => {
    setUsuario(e.target.value);
  };

  const handleChangeSenha = (e) => {
    setSenha(e.target.value);
  };

  return (
    <div className='login'>
      <h2>Tela de Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="usuario">Usuário:</label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={handleChangeUsuario}
          />
          {erro.usuario && <p className="error-message">{erro.usuario}</p>}
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={handleChangeSenha}
          />
          {erro.senha && <p className="error-message">{erro.senha}</p>}
        </div>
        {erro && !erro.usuario && !erro.senha && (
          <p className="error-message">{erro}</p>
        )}
        <button type="submit">Entrar</button>
      </form>
      <p>
        Se você ainda não possui uma conta,{' '}
        <a href="/cadastroUsuario">clique aqui</a> para se cadastrar.
      </p>
    </div>
  );
};

export default Login;
