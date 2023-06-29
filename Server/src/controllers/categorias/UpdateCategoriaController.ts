import { Request, Response } from "express";
import { prismaClient } from "../../dataBase/prismaClients";

export class UpdateCategoria {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, descricao } = request.body;

    try {
      const categoria = await prismaClient.categoria.update({
        where: {
          id: parseInt(id),
        },
        data: {
          nome,
          descricao,
        },
      });

      return response.json(categoria);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao atualizar categoria" });
    }
  }
}
