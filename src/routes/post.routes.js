import express from "express";
import postController from "../controllers/postController.js";

const postRouter = express.Router();
// Definindo as rotas

// Get buscar todos os usuários
postRouter.get("/", postController.getAll);

// Get buscar um usuário pelo id
postRouter.get("/:title", postController.getByPostTitle);

// Post criar um usuário
postRouter.post("/", postController.createPost);

// Put atualizar um usuário
postRouter.put("/:title", postController.updatePost);

// Delete deletar um usuário
postRouter.delete("/:title", postController.delete);

// Like um post
postRouter.patch("/:title/like", postController.likePost);

// Comment um post
postRouter.patch("/:title/comment", postController.commentPost);

export default postRouter;
