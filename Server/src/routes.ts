import { Router } from "express";
import { CreateAtividades } from "../src/controllers/atividades/createAtividadeController";
import { DeleteAtividade } from "../src/controllers/atividades/DeleteAtividadeController";
import { UpdateAtividade } from "../src/controllers/atividades/UpdateAtividadeController";
import { GetAtividade } from "../src/controllers/atividades/GetAtividadeController";

import { CreateUsuario } from "../src/controllers/usuarios/createUsuarioController";
import { DeleteUsuario } from "../src/controllers/usuarios/DeleteUsuarioController";
import { UpdateUsuario } from "../src/controllers/usuarios/UpdateUsuarioController";
import { GetUsuarios } from "../src/controllers/usuarios/GetUsuarioController";
import { LoginController } from "../src/controllers/usuarios/LoginController";

const router = Router();

const createAtividades = new CreateAtividades();
const deleteAtividade = new DeleteAtividade();
const updateAtividade = new UpdateAtividade();
const getAtividade = new GetAtividade();

const createUsuario = new CreateUsuario();
const deleteUsuario = new DeleteUsuario();
const updateUsuario = new UpdateUsuario();
const getUsuarios = new GetUsuarios();
const loginController = new LoginController();

router.post("/atividade", createAtividades.handle);
router.delete("/atividade/:id", deleteAtividade.handle);
router.put("/atividade/:id", updateAtividade.handle);
router.get("/atividade", getAtividade.handle);

router.post("/usuario", createUsuario.handle);
router.delete("/usuario/:id", deleteUsuario.handle);
router.put("/usuario/:id", updateUsuario.handle);
router.get("/usuarios", getUsuarios.handle);

router.post("/login", loginController.handle);

export { router };
