import { prismaClient } from "../../dataBase/prismaClients"
import { Request, Response } from "express";


export class UpdateUsuario {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { usuario, senha } = request.body;
        try {
            const Usuario = await prismaClient.usuario.update({
                where: { id: parseInt(id) }, // Converter id para número usando parseInt()
                data: { usuario, senha },
            });
            return response.json(Usuario);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro ao atualizar a atividade" });
        }
    }
}

