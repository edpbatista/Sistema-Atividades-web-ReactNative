import { prismaClient } from "../dataBase/prismaClients"
import { Request, Response } from "express";


export class UpdateAtividade {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { nome, data } = request.body;
        try {
            const atividade = await prismaClient.atividade.update({
                where: { id: parseInt(id) }, // Converter id para número usando parseInt()
                data: { nome, data },
            });
            return response.json(atividade);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro ao atualizar a atividade" });
        }
    }
}

