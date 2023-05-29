import { prismaClient } from "../../dataBase/prismaClients";
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';

export class CreateUsuario {
  async handle(request: Request, response: Response) {
    const { nomeDeUsuario, senha, nome } = request.body;
    try {
      // Criptografa a senha
      const hashedSenha = await bcrypt.hash(senha, 10); // 10 é o número de salt rounds

      const usuario = await prismaClient.usuario.create({
        data: {
          nomeDeUsuario: nomeDeUsuario,
          senha: hashedSenha, // Armazena a senha criptografada no banco de dados
          nome: nome
        }
      });

      return response.json(usuario);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: 'Ocorreu um erro durante o cadastro do usuário' });
    }
  }
}
