import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import './CadastroUsuario.css'

const CadastroUsuario = () => {
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState({});

  const schema = Yup.object().shape({
    nome: Yup.string().required('O nome é obrigatório'),
    usuario: Yup.string().required('O usuário é obrigatório'),
    senha: Yup.string().required('A senha é obrigatória'),
  });

  const handleCadastro = async () => {
    try {
      await schema.validate({ nome, usuario, senha }, { abortEarly: false });

      // Se a validação for bem-sucedida, continuar com o cadastro
      const response = await axios.post('http://localhost:4003/usuario', {
        nome,
        usuario,
        senha,
      });

      console.log(response.data);
      // Exibir mensagem de sucesso ou redirecionar para a próxima página
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
      } else {
        console.error(error);
        // Exibir mensagem de erro ao usuário
      }
    }
  };

  return (
    <div>
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
          {errors.nome && <span>{errors.nome}</span>}
        </div>
        <div>
          <label htmlFor="usuario">Usuário:</label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          {errors.usuario && <span>{errors.usuario}</span>}
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {errors.senha && <span>{errors.senha}</span>}
        </div>
        <button type="button" onClick={handleCadastro}>
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroUsuario;
