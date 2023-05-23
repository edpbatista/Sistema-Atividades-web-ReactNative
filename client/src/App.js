import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from '../src/route/PrivateRoute';
import Atividade from './pages/atividades/atividades';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import CadastroUsuario from './pages/cadastroUsuario/CadastroUsuario';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Route exact path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <PrivateRoute
        path="/home"
        component={Home}
        isLoggedIn={isLoggedIn}
        redirectPath="/login"
      />
      <PrivateRoute
        path="/atividades"
        component={Atividade}
        isLoggedIn={isLoggedIn}
        redirectPath="/login"
      />
      <PrivateRoute
        path="/cadastroUsuario"
        component={CadastroUsuario}
        isLoggedIn={isLoggedIn}
        redirectPath="/login"
      />
    </Router>
  );
};

export default App;
