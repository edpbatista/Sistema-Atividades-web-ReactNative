import { prismaClient } from "../dataBase/prismaClients"
import { Request, Response } from "express";


export class CreateUsuario {
    async handle(request: Request, response: Response) {

        const { login, senha } = request.body;
        try {

            const usuario = await prismaClient.usuario.create({
                data: {
                    login,
                    senha
                }
            })

            return response.json(usuario);

        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro ao cadastrar aluno" });
        }

    }
}

