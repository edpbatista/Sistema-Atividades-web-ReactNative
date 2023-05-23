import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const [error, setError] = useState('');

  const validationSchema = Yup.object().shape({
    usuario: Yup.string().required('Campo obrigatório'),
    senha: Yup.string().required('Campo obrigatório'),
  });

  const formik = useFormik({
    initialValues: {
      usuario: '',
      senha: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.get('http://localhost:4003/usuarios', {
          params: {
            usuario: values.usuario,
            senha: values.senha,
          },
        });

        if (response.data.success) {
          // Redirecionar para a página /home
          console.log('Login bem-sucedido!');
        } else {
          setError('Usuário não encontrado ou senha inválida');
        }
      } catch (error) {
        console.error(error);
        setError('Ocorreu um erro durante o login');
      }
    },
  });

  return (
    <div>
      <h2>Tela de Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="usuario">Usuário:</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={formik.values.usuario}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.usuario && formik.errors.usuario && (
            <p className="error-message">{formik.errors.usuario}</p>
          )}
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formik.values.senha}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.senha && formik.errors.senha && (
            <p className="error-message">{formik.errors.senha}</p>
          )}
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
