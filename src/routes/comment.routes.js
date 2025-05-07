import express from 'express';
import commentController from '../controllers/commentController.js';

const commentRouter = express.Router();

// Get buscar todos os comentários
commentRouter.get('/', commentController.getAll);

// Post criar um comentário
commentRouter.post('/', commentController.createComment);

// Put atualizar um comentário
commentRouter.put('/:id', commentController.updateComment);

// Delete deletar um comentário
commentRouter.delete('/:id', commentController.deleteComment);

// Like em um comentário
commentRouter.patch('/:id/like', commentController.likeComment);

// responda em um comentário
commentRouter.patch('/:id/comment', commentController.commentPost);

export default commentRouter;