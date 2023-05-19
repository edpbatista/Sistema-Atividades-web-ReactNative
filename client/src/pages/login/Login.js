import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4003/usuario/login', {
        usuario,
        senha,
      });

      // Verifica a resposta da requisição de login
      if (response.data.success) {
        // Redireciona para a página principal em caso de sucesso
        window.location.href = '/home';
      } else {
        // Exibe uma mensagem de erro caso o usuário ou senha estejam incorretos
        alert('Usuário ou senha incorretos');
      }
    } catch (error) {
      console.error(error);
      // Exibe uma mensagem de erro genérica em caso de falha na autenticação
      alert('Erro ao fazer login. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Usuário:</label>
          <input
            type="text"
            id="username"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            maxLength={8}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p>
        Ainda não tem uma conta? <a href="/cadastroUsuario">Cadastre-se</a>
      </p>
      <p>
        Esqueceu sua senha? <a href="/recuperar-senha">Esqueci minha senha</a>
      </p>
    </div>
  );
};

export default Login;
