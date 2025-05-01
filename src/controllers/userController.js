import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

class UserController {

  async getAll(req, res) {
    try {
      const users = await userModel.getAll();
      if (!users || users.length === 0) {
        return res.status(200).json({ message: 'Nenhum usuário encontrado.' });
      }
      res.json(users);
    } catch (error) {
      console.error('Erro ao buscar todos os usuários:', error);
      res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
  }

  async getByUserName(req, res) {
    const { userName } = req.params;

    // Validação básica
    if (!userName || typeof userName !== 'string' || userName.trim() === '') {
      return res.status(400).json({ erro: 'userName inválido.' });
    }

    try {
      const user = await userModel.getByUserName(userName.trim());
      if (!user) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
      }

      // Converte BigInt para string para evitar erro de serialização
      const userSerialized = JSON.parse(JSON.stringify(user, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
      ));

      res.status(200).json(userSerialized);
    } catch (error) {
      console.error(`Erro ao buscar usuário pelo userName (${userName}):`, error.message, error.stack);
      res.status(500).json({ erro: 'Erro ao buscar usuário.' });
    }
  }

  async update(req, res) {
    const { userName } = req.params;
    const {
      name, password, age, sex, height, weight, descriptionObjective, restriction, conditioning, imageProfile,
    } = req.body;

    if (!userName) {
      return res.status(400).json({ erro: 'userName é obrigatório.' });
    }

    try {
      // Criptografando a senha
      const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

      const userAtualizado = await userModel.update(
        userName,
        name,
        hashedPassword,
        age,
        sex,
        height,
        weight,
        descriptionObjective,
        restriction,
        conditioning,
        imageProfile
      );

      if (!userAtualizado) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      res.status(200).json(userAtualizado);
    } catch (error) {
      console.error(error);
      if (error.code === 'P2025') {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }
      res.status(500).json({ erro: 'Erro ao atualizar usuário' });
    }
  }

  async delete(req, res) {
    const { userName } = req.params;
    try {
      const sucesso = await userModel.delete(userName);
      if (!sucesso) {
        return res.status(404).json({ erro: "User não encontrado" });
      }
      res.status(200).send({ message: "User deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao deletar User" });
    }
  }

}
export default new UserController();