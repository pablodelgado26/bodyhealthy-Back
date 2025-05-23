import express from 'express';
import trainingController from '../controllers/trainingController.js';



const trainingRoutes = express.Router();

trainingRoutes.get("/", trainingController.getAll);
trainingRoutes.get("/:title", trainingController.getByTitle);
trainingRoutes.post("/", trainingController.createTraining)

export default trainingRoutes;