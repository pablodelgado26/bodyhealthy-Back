import express from "express";
import postController from "../controllers/postController.js";

const postRouter = express.Router();
// Definindo as rotas

// Get buscar todos os posts
postRouter.get("/", postController.getAll);

// Get buscar um post pelo titulo
postRouter.get("/:title", postController.getByPostTitle);

// Post criar um post
postRouter.post("/", postController.createPost);

// Put atualizar um post
postRouter.put("/:title", postController.updatePost);

// Delete deletar um post
postRouter.delete("/:title", postController.delete);

// Like em um post
postRouter.patch("/:title/like", postController.likePost);

// Comment em um post
postRouter.patch("/:title/comment", postController.commentPost);

export default postRouter;
