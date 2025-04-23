import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();
// Definindo as rotas

// Rota de login
router.post("/login", userController.login);

// Get buscar todos os usuários
router.get("/", userController.getAll);

// Get buscar um usuário pelo id
router.get("/:userName", userController.getByUserName);

// Post criar um usuário
router.post("/", userController.create);

// Put atualizar um usuário
router.put("/:userName", userController.update);

// Delete deletar um usuário
router.delete("/:userName", userController.delete);

export default router;
