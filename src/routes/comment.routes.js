import express from 'express';
import commentController from '../controllers/commentController.js';

const commentRouter = express.Router();

// Post criar um comentário
commentRouter.post('/', commentController.createComment);


// Delete deletar um comentário
commentRouter.delete('/:id', commentController.deleteComment);

// Like em um comentário
commentRouter.patch('/:id/like', commentController.likeComment);

 
export default commentRouter;