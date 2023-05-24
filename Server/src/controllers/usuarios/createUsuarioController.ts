import { prismaClient } from "../../dataBase/prismaClients";
import { Request, Response } from "express";

export class CreateUsuario {
  async handle(request: Request, response: Response) {
    const { nomeDeUsuario, senha, nome } = request.body;
    try {
      const usuario = await prismaClient.usuario.create({
        data: {
          nomeDeUsuario: nomeDeUsuario, // Atribuir o valor de nomeDeUsuario corretamente
          senha: senha,
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
