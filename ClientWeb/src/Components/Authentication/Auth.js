import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckAuthentication = (response) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (response.status === 200 && response.data === true) {
      // Autenticação bem-sucedida, permitir o acesso às rotas privadas
      navigate('/home');
    } else {
      // Autenticação falhou, redirecionar para a página de login
      navigate('/');
    }
  }, [navigate, response]);

  return null;
};

export default CheckAuthentication;
