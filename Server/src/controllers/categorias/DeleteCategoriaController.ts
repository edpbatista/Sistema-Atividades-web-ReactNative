import { Request, Response } from "express";
import { prismaClient } from "../../dataBase/prismaClients";

export class DeleteCategoria {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await prismaClient.categoria.delete({
        where: {
          id: parseInt(id),
        },
      });

      return response.status(204).send();
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao excluir categoria" });
    }
  }
}
