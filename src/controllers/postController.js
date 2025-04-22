import postModel from "../models/postModel.js";


class PostController {

  getAll = async (req, res) => {
    try {
      const posts = await postModel.getAll();
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar posts" });
    }
  };

  getByUserName = async (req, res) => {
    const { userName } = req.params;
  
    // Validação básica
    if (!userName || typeof userName !== 'string' || userName.trim() === '') {
      return res.status(400).json({ erro: 'userName inválido.' });
    }
  
    try {
      const user = await postModel.getByUserName(userName.trim());
      if (!user) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
      }
  
      // Converte BigInt para string para evitar erro de serialização
      const userSerialized = JSON.parse(JSON.stringify(user, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
      ));
  
      return res.status(200).json(userSerialized);
    } catch (error) {
      console.error(`Erro no controller getByUserName (userName: ${userName}):`, error.message, error.stack);
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
      const novoUsuario = await postModel.create({
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
  
      const userAtualizado = await postModel.update(
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
      const sucesso = await postModel.delete(Number(id));
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
export default new PostController();