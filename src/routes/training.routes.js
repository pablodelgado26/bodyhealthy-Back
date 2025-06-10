import express from 'express';
import trainingController from '../controllers/trainingController.js';



const trainingRoutes = express.Router();

trainingRoutes.get("/", trainingController.getAll);
trainingRoutes.get("/:userName", trainingController.getByUser);
trainingRoutes.post("/", trainingController.createTraining)
trainingRoutes.put("/:userName/:title", trainingController.updateTraining);
trainingRoutes.delete("/:userName/:title", trainingController.deleteTraining)

export default trainingRoutes;