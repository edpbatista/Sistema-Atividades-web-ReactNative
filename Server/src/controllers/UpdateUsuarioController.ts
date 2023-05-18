import { prismaClient } from "../dataBase/prismaClients"
import { Request, Response } from "express";


export class UpdateUsuario {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { login, senha } = request.body;
        try {
            const usuario = await prismaClient.usuario.update({
                where: { id: parseInt(id) }, // Converter id para número usando parseInt()
                data: { login, senha },
            });
            return response.json(usuario);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro ao atualizar a atividade" });
        }
    }
}

