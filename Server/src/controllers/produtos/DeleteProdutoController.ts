import { prismaClient } from "../../dataBase/prismaClients";
import { Request, Response } from "express";

export class DeleteProduto {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const produto = await prismaClient.produto.delete({
        where: {
          id: Number(id),
        },
      });

      return response.json(produto);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao deletar produto" });
    }
  }
}
