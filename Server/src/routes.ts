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

import { CreateProduto } from "../src/controllers/produtos/CreateProdutoController";
import { DeleteProduto } from "../src/controllers/produtos/DeleteProdutoController";
import { UpdateProduto } from "../src/controllers/produtos/UpdateProdutoController";
import { GetProdutos } from "../src/controllers/produtos/GetProdutosController";

import { CreateCategoria } from "../src/controllers/categorias/CreateCategoriaController";
import { DeleteCategoria } from "../src/controllers/categorias/DeleteCategoriaController";
import { UpdateCategoria } from "../src/controllers/categorias/UpdateCategoriaController";
import { GetCategorias } from "../src/controllers/categorias/GetCategoriasController";


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

const createProduto = new CreateProduto();
const deleteProduto = new DeleteProduto();
const updateProduto = new UpdateProduto();
const getProdutos = new GetProdutos();

const createCategoria = new CreateCategoria();
const deleteCategoria = new DeleteCategoria();
const updateCategoria = new UpdateCategoria();
const getCategorias = new GetCategorias();

router.post("/atividade", createAtividades.handle);
router.delete("/atividade/:id", deleteAtividade.handle);
router.put("/atividade/:id", updateAtividade.handle);
router.get("/atividade", getAtividade.handle);

router.post("/usuario", createUsuario.handle);
router.delete("/usuario/:id", deleteUsuario.handle);
router.put("/usuario/:id", updateUsuario.handle);
router.get("/usuarios", getUsuarios.handle);

router.post("/login", loginController.handle);

router.post("/produto", createProduto.handle);
router.delete("/produto/:id", deleteProduto.handle);
router.put("/produto/:id", updateProduto.handle);
router.get("/produtos", getProdutos.handle);

router.post("/categoria", createCategoria.handle);
router.delete("/categoria/:id", deleteCategoria.handle);
router.put("/categoria/:id", updateCategoria.handle);
router.get("/categorias", getCategorias.handle);

export { router };
