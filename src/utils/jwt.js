// src/utils/jwt.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); // Carrega o .env se ainda não tiver sido carregado

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("JWT_SECRET não definido no .env");
}

export const gerarToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "30d" }); // válido por 7 dias
};

export const verificarToken = (token) => {
  return jwt.verify(token, SECRET);
};
