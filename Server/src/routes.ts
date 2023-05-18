import { Router } from "express";
import { CreateAtividades } from "./controllers/createAtividadeController";
import { DeleteAtividade } from "./controllers/DeleteAtividadeController";
import { UpdateAtividade } from "./controllers/UpdateAtividadeController";
import { CreateUsuario } from "./controllers/createUsuarioController";

const router = Router();

const createAtividades = new CreateAtividades();
const deleteAtividade = new DeleteAtividade();
const updateAtividade = new UpdateAtividade();

const createUsuario = new CreateUsuario();
const deleteUsuario = new DeleteAtividade();
const updateUsuario = new UpdateAtividade();

router.post("/atividade", createAtividades.handle);
router.delete("/atividade/:id", deleteAtividade.handle);
router.put("/atividade/:id", updateAtividade.handle);

router.post("/usuario", createUsuario.handle);
router.delete("/usuario/:id", deleteUsuario.handle);
router.put("/usuario/:id", updateUsuario.handle);

export { router };
