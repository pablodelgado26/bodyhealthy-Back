import express from "express"

import authRouter from "./auth.routes.js"
import postRouter from "./post.routes.js"
import userRouter from "./user.routes.js"
import commentRouter from "./comment.routes.js"
import authMiddleware from "../middleware/authMiddleware.js"
import exerciseRoutes from "./exercise.routes.js"
import trainingRoutes from "./training.routes.js"

const router = express.Router()

//Rotas de públicas

router.use("/auth", authRouter)

// Rotas privadas
router.use(authMiddleware)

router.use("/comment", commentRouter)
router.use("/posts", postRouter)
router.use("/user", userRouter)
router.use("/exercise", exerciseRoutes )
router.use("/training", trainingRoutes)

export default router