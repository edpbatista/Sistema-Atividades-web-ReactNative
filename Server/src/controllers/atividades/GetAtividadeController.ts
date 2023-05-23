import { prismaClient } from "../../dataBase/prismaClients";
import { Request, Response } from "express";

export class GetAtividade {
  async handle(request: Request, response: Response) {
    try {
      const atividades = await prismaClient.atividade.findMany();
      return response.json(atividades);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao buscar as atividades" });
    }
  }
}
