import { prismaClient } from "../../dataBase/prismaClients";
import { Request, Response } from "express";

export class GetUsuarios {
  async handle(request: Request, response: Response) {
    try {
      const usuarios = await prismaClient.usuario.findMany();
      return response.json(usuarios);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao buscar os usuários" });
    }
  }
}
