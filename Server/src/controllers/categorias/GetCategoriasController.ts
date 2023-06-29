import { Request, Response } from "express";
import { prismaClient } from "../../dataBase/prismaClients";

export class GetCategorias {
  async handle(request: Request, response: Response) {
    try {
      const categorias = await prismaClient.categoria.findMany();

      return response.json(categorias);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao obter categorias" });
    }
  }
}
