import express from "express";
import postController from "../controllers/postController.js";

const router = express.Router();
// Definindo as rotas

// Get buscar todos os usuários
router.get("/", postController.getAll);

// Get buscar um usuário pelo id
router.get("/:title", postController.getByPostTitle);

// Post criar um usuário
router.post("/", postController.createPost);

// Put atualizar um usuário
router.put("/:title", postController.updatePost);

// Delete deletar um usuário
router.delete("/:title", postController.delete);

// Like um post
router.patch("/:title/like", postController.likePost);

// Comment um post
router.patch("/:title/comment", postController.commentPost);

export default router;
