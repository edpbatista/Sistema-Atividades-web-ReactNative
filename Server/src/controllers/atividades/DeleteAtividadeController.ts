import { prismaClient } from "../../dataBase/prismaClients"
import { Request, Response } from "express";


export class DeleteAtividade {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        try {
            const atividade = await prismaClient.atividade.delete({
                where: { id: parseInt(id) }, // Converter id para número usando parseInt()
            });
            return response.json(atividade);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro ao deletar a atividade" });
        }
    }
}

