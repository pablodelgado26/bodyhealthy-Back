import express from 'express';
import exerciseController from '../controllers/exerciseController.js';
import e from 'express';


const exerciseRoutes = express.Router();

exerciseRoutes.get("/", exerciseController.getAll);
exerciseRoutes.get("/:userName/:title", exerciseController.getByTitle);
exerciseRoutes.post("/", exerciseController.createExercise)
exerciseRoutes.delete("/:title", exerciseController.delete);

export default exerciseRoutes;