import express from "express"

import authRouter from "./auth.routes.js"
import postRouter from "./post.routes.js"
import userRouter from "./user.routes.js"

import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

//Rotas de públicas

router.use("/auth", authRouter)

// Rotas privadas
router.use(authMiddleware)

router.use("/posts", postRouter)
router.use("/user", userRouter)

export default router