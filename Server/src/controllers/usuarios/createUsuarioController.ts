import { prismaClient } from "../../dataBase/prismaClients"
import { Request, Response } from "express";


export class CreateUsuario {
    async handle(request: Request, response: Response) {

        const { nomeDeUsuario, senha, nome } = request.body;
        try {

            const Usuario = await prismaClient.usuario.create({
                data: {
                    nomeDeUsuario,
                    senha,
                    nome,
                    
                }
            })

            return response.json(Usuario);

        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro ao cadastrar aluno" });
        }

    }
}

