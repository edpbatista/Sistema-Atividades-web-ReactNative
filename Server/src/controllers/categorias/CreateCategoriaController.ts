import { Request, Response } from "express";
import { prismaClient } from "../../dataBase/prismaClients";

export class CreateCategoria {
  async handle(request: Request, response: Response) {
    const { nome, descricao } = request.body;

    try {
      const categoria = await prismaClient.categoria.create({
        data: {
          nome,
          descricao,
        },
      });

      return response.status(201).json(categoria);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao criar categoria" });
    }
  }
}
