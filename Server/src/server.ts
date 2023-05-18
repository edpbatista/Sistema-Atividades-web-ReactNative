import express from 'express';
import { router } from './routes';

const app = express();

app.use(express.json())

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Lógica de autenticação
  if (username === 'admin' && password === 'admin') {
    res.json({ message: 'Login bem-sucedido' });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  
app.use(router)

app.listen(4003, () => console.log("Servidor Rodando na porta 4003"));