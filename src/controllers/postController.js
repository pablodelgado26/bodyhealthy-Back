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

  getByPostTitle = async (req, res) => {
    const { title } = req.params;
  
    // Validação básica
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ erro: 'title inválido.' });
    }
  
    try {
      const post = await postModel.getByPostTitle(title.trim());
      if (!post) {
        return res.status(404).json({ erro: 'Postagem não encontrada.' });
      }
      return res.status(200).json(postSerialized);
    } catch (error) {
      console.error(`Erro no controller getByPostTitle (title: ${title}):`, error.message, error.stack);
      return res.status(500).json({ erro: 'Erro ao buscar postagem.' });
    }
  };
  
  

  create = async (req, res) => {
    const { title, description, imagePost } = req.body;
    const userName = req.user?.userName;
  
    try {
      if (!title || !description) {
        return res.status(400).json({
          erro: "Os campos 'title' e 'description' são obrigatórios.",
        });
      }
  
      if (!userName) {
        return res.status(401).json({
          erro: "Usuário não autenticado.",
        });
      }
  
      const novoPost = await postModel.create({
        data: {
          title,
          description,
          imagePost,
          like: 0,
          comment: 0,
          userName,
        },
      });
  
      res.status(201).json(novoPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao criar post." });
    }
  };
  
  update = async (req, res) => {
    const { id } = req.params;
    const { title, description, imagePost } = req.body;
  
    try {
      const postAtualizado = await postModel.update(Number(id), {
        title,
        description,
        imagePost,
      });
  
      if (!postAtualizado) {
        return res.status(404).json({ erro: "Post não encontrado" });
      }
  
      res.json(postAtualizado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao atualizar post" });
    }
  };
  

  delete = async (req, res) => {
    const { id } = req.params;
  
    try {
      const postDeletado = await postModel.delete(Number(id));
  
      if (!postDeletado) {
        return res.status(404).json({ erro: "Post não encontrado" });
      }
  
      res.status(200).send({ message: "Post deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao deletar post" });
    }
  };
  

  


  
}
export default new PostController();