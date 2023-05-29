import express from 'express';
import { router } from './routes';

const app = express();

app.use(express.json())

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:19006'
  ];
  
  app.use((req, res, next) => {
    const { origin } = req.headers;
    if (typeof origin === 'string' && allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  
  
app.use(router)

app.listen(4003, () => console.log("Servidor Rodando na porta 4003"));