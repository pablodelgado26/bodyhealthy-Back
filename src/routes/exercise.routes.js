import express from 'express';
import exerciseController from '../controllers/exerciseController.js';


const exerciseRoutes = express.Router();

exerciseRoutes.get("/", exerciseController.getAll);
exerciseRoutes.get("/:title", exerciseController.getByTitle);

export default exerciseRoutes;