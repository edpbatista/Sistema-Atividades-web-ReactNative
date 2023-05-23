import { prismaClient } from "../../dataBase/prismaClients"
import { Request, Response } from "express";


export class DeleteUsuario {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        try {
            const usuario = await prismaClient.usuario.delete({
                where: { id: parseInt(id) }, // Converter id para número usando parseInt()
            });
            return response.json(usuario);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro ao deletar a atividade" });
        }
    }
}

