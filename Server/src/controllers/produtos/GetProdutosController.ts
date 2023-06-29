import { prismaClient } from "../../dataBase/prismaClients";
import { Request, Response } from "express";

export class GetProdutos {
    async handle(request: Request, response: Response) {
      const { categoria, precoMin, precoMax } = request.query;
  
      try {
        let produtos = await prismaClient.produto.findMany();
  
        if (categoria) {
          produtos = produtos.filter((produto) => produto.categoriaId === Number(categoria));
        }
  
        if (precoMin) {
          produtos = produtos.filter((produto) => produto.preco >= Number(precoMin));
        }
  
        if (precoMax) {
          produtos = produtos.filter((produto) => produto.preco <= Number(precoMax));
        }
  
        return response.json(produtos);
      } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Erro ao obter produtos" });
      }
    }
  }
  
