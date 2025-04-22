import express from "express";
import postController from "../controllers/postController.js";

const router = express.Router();
// Definindo as rotas

// Get buscar todos os usuários
router.get("/", postController.getAll);
// Get buscar um usuário pelo id
router.get("/:title", postController.getByPostTitle);
// Post criar um usuário
router.post("/", postController.create);
// Put atualizar um usuário
router.put("/:id", postController.update);
// Delete deletar um usuário
router.delete("/:id", postController.delete);
export default router;
