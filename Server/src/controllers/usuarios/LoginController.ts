import { prismaClient } from "../../dataBase/prismaClients";
import { Request, Response } from "express";

export class LoginController {
  async handle(request: Request, response: Response) {
    const { usuario, senha } = request.body;

    try {
      const user = await prismaClient.usuario.findUnique({
        where: { nomeDeUsuario : usuario },
      });

      if (!user) {
        return response.status(404).json({ success: false, message: 'Usuário não encontrado' });
      }

      if (user.senha !== senha) {
        return response.status(401).json({ success: false, message: 'Senha incorreta' });
      }

      // Autenticação bem-sucedida
      return response.json({ success: true, message: 'Acesso consedido' });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ success: false, message: 'Ocorreu um erro durante o login' });
    }
  }
}
