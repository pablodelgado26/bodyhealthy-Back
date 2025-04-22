import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();
// Definindo as rotas

// Get buscar todos os usuários
router.get("/", userController.getAll);
// Get buscar um usuário pelo id
router.get("/:userName", userController.getByUserName);
// Post criar um usuário
router.post("/", userController.create);
// Put atualizar um usuário
router.put("/:id", userController.update);
// Delete deletar um usuário
router.delete("/:id", userController.delete);
export default router;
