import { prismaClient } from "../../dataBase/prismaClients";
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';

export class LoginController {
  async handle(request: Request, response: Response) {
    const { usuario, senha } = request.body;

    try {
      const user = await prismaClient.usuario.findUnique({
        where: { nomeDeUsuario: usuario },
      });

      if (!user) {
        // Verifica se é o primeiro acesso e cria o usuário admin
        if (usuario === 'admin' && senha === 'admin123') {
          const hashedPassword = await bcrypt.hash(senha, 10);

          await prismaClient.usuario.create({
            data: {
              nomeDeUsuario: usuario,
              senha: hashedPassword,
              nome: 'Admin',
            },
          });

          return response.json({ success: true, message: 'Usuário admin criado com sucesso' });
        }

        return response.status(404).json({ success: false, message: 'Usuário não encontrado' });
      }

      const match = await bcrypt.compare(senha, user.senha);

      if (match) {
        // Autenticação bem-sucedida
        return response.json({ success: true, message: 'Acesso concedido' });
      } else {
        return response.status(401).json({ success: false, message: 'Senha incorreta' });
      }
    } catch (error) {
      console.error(error);
      return response.status(500).json({ success: false, message: 'Ocorreu um erro durante o login' });
    }
  }
}
