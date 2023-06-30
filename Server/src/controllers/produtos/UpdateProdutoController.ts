import { prismaClient } from "../../dataBase/prismaClients";
import { Request, Response } from "express";

export class UpdateProduto {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, descricao, categoriaId, preco } = request.body;

    try {
      const produto = await prismaClient.produto.update({
        where: {
          id: Number(id),
        },
        data: {
          nome,
          descricao,
          categoria: {
            connect: { id: categoriaId },
          },
          preco,
        },
      });
      

      return response.json(produto);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao atualizar produto" });
    }
  }
}
