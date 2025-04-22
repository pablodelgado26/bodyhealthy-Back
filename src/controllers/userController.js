import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

class UserController {

  getAll = async (req, res) => {
    try {
      const users = await userModel.getAll();
      if (!users || users.length === 0) {
        return res.status(200).json({ message: 'Nenhum usuário encontrado.'});
      }
      return res.status(200).json(users);
    } catch (error) {
      console.error('Erro no controller getAll:', error.message, error.stack);
      return res.status(500).json({ erro: 'Erro ao buscar usuários.' });
    }
  };

  getById = async (req, res) => {
    const { id } = req.params;

    // Valida se id é um número válido
    const parsedId = parseInt(id);
    if (isNaN(parsedId) || parsedId <= 0) {
      return res.status(400).json({ erro: 'ID inválido.' });
    }

    try {
      const user = await userModel.getById(parsedId);
      if (!user) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error(`Erro no controller getById (id: ${parsedId}):`, error.message, error.stack);
      return res.status(500).json({ erro: 'Erro ao buscar usuário.' });
    }
  };


  create = async (req, res) => {
    const {
      userName,
      name,
      email,
      password,
      cellPhone,
      age,
      sex,
      height,
      weight,
      descriptionObjective,
      restriction,
      conditioning,
      imageProfile,
    } = req.body;
  
    try {
      // Validação de campos obrigatórios
      if (!userName || !name || !email || !password || !cellPhone || !age || !sex || !height || !weight) {
        return res.status(400).json({ erro: 'Algum campo obrigatório não preenchido.' });
      }
  
      // Conversão de tipos com validação
      const parsedCellPhone = parseInt(cellPhone);
      const parsedAge = parseInt(age);
      const parsedHeight = parseFloat(height);
      const parsedWeight = parseFloat(weight);
  
      if (isNaN(parsedCellPhone) || isNaN(parsedAge) || isNaN(parsedHeight) || isNaN(parsedWeight)) {
        return res.status(400).json({ erro: 'Formato inválido para celular, idade, altura ou peso.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Criação do novo usuário chamando o model
      const novoUsuario = await userModel.create({
        userName,
        name,
        email,
        password: hashedPassword,
        cellPhone: parsedCellPhone,
        age: parsedAge,
        sex,
        height: parsedHeight,
        weight: parsedWeight,
        descriptionObjective,
        restriction,
        conditioning,
        imageProfile,
      });
  
      // Conversão de BigInt para string
      const usuarioSerializado = JSON.parse(JSON.stringify(novoUsuario, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
      ));
  
      return res.status(201).json(usuarioSerializado);
    } catch (error) {
      console.error('Erro ao criar usuário:', error.message, error.stack);
      return res.status(400).json({
        erro: error.message || 'Erro ao criar usuário.',
      });
    }
  };

  update = async (req, res) => {
    const { id } = req.params;
    const {
      name, password, age, sex, height, weight, descriptionObjective, restriction, conditioning, imageProfile,
    } = req.body;
  
    const parsedId = parseInt(id);
    if (isNaN(parsedId) || parsedId <= 0) {
      return res.status(400).json({ erro: 'ID inválido.' });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const userAtualizado = await userModel.update(
        parsedId, name, hashedPassword, age, sex, height, weight, descriptionObjective, restriction, conditioning, imageProfile
      );
  
      if (!userAtualizado) {
        return res.status(404).json({ erro: 'User não encontrado' });
      }
  
      return res.status(200).json(userAtualizado);
    } catch (error) {
      console.error(error);
      if (error.code === 'P2025') {
        return res.status(404).json({ erro: 'User não encontrado' });
      }
      return res.status(500).json({ erro: 'Erro ao atualizar User' });
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const sucesso = await userModel.delete(Number(id));
      if (!sucesso) {
        return res.status(404).json({ erro: "User não encontrado" });
      }
      res.status(200).send({ message: "User deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao deletar User" });
    }
  };
}
export default new UserController();