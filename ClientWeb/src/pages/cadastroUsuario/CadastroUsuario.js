import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import './CadastroUsuario.css';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const CadastroUsuario = () => {
  const [nome, setNome] = useState('');
  const [nomeDeUsuario, setNomeDeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate('/home'); // Redireciona para a página inicial
  };

  const schema = Yup.object().shape({
    nome: Yup.string().required('O nome é obrigatório'),
    nomeDeUsuario: Yup.string().required('O usuário é obrigatório'),
    senha: Yup.string().required('A senha é obrigatória'),
  });

  const handleCadastro = async () => {
    try {
      await schema.validate({ nome, nomeDeUsuario, senha }, { abortEarly: false });

      // Se a validação for bem-sucedida, continuar com o cadastro

      // Criptografa a senha
      const hashedSenha = await bcrypt.hash(senha, 10); // 10 é o número de salt rounds
      console.log('Senha criptografada:', hashedSenha); 


      const response = await axios.post('http://localhost:4003/usuario', {
        nome,
        nomeDeUsuario,
        senha: hashedSenha, // Envia a senha criptografada para o backend
      });

      console.log(response.data);
      // Exibir mensagem de sucesso
      setSuccessMessage('Cadastro realizado com sucesso!');
      setErrorMessage('');

      // Limpar os campos após o cadastro bem-sucedido
      setNome('');
      setNomeDeUsuario('');
      setSenha('');

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
        setErrorMessage('Ocorreu um erro ao cadastrar. Por favor, tente novamente.');
        setSuccessMessage('');
      }
    }
  };

  return (
    <div className="CadastroUsuario">
      <h2>Cadastro de Usuário</h2>
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
          <label htmlFor="usuario">Usuário:</label>
          <input
            type="text"
            id="usuario"
            value={nomeDeUsuario}
            onChange={(e) => setNomeDeUsuario(e.target.value)}
          />
        </div>
        <div>
          {errors.nomeDeUsuario && <span className="error">{errors.nomeDeUsuario}</span>}
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <div>
          {errors.senha && <span className="error">{errors.senha}</span>}
        </div>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <br />
        <button type="button" onClick={handleCadastro}>
          Cadastrar
        </button>
        <br />
        <button type="button" onClick={handleVoltar}>
          Voltar
        </button>
      </form>
    </div>
  );
};

export default CadastroUsuario;
