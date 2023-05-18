import { prismaClient } from "../dataBase/prismaClients"
import { Request, Response } from "express";


export class CreateAtividades {
    async handle(request: Request, response: Response) {

        const { nome, data } = request.body;
        try {

            const atividade = await prismaClient.atividade.create({
                data: {
                    nome,
                    data
                }
            })

            return response.json(atividade);

        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro ao cadastrar aluno" });
        }

    }
}

