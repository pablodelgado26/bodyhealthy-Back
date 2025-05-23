import express from "express";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

// Get buscar todos os usuários
userRouter.get("/", userController.getAll);

// Get buscar um usuário pelo userName
userRouter.get("/:userName", userController.getByUserName);

// Put atualizar um usuário
userRouter.put("/:userName", userController.update);

// Delete deletar um usuário
userRouter.delete("/:userName", userController.delete);

export default userRouter;
