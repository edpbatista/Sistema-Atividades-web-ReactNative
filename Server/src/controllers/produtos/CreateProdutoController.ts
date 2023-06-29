import { prismaClient } from "../../dataBase/prismaClients";
import { Request, Response } from "express";

export class CreateProduto {
  async handle(request: Request, response: Response) {
    const { nome, descricao, preco, categoriaId } = request.body;

    try {
      const produto = await prismaClient.produto.create({
        data: {
          nome,
          descricao,
          preco: parseFloat(preco), // Converte para número de ponto flutuante
          categoriaId: parseInt(categoriaId),
        },
      });

      return response.json(produto);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao cadastrar produto" });
    }
  }
}
