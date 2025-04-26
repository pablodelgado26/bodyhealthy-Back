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
  
  async createPost(req, res) {
    try {
      // Validação básica
      const {
        title,
        description,
        imagePost,
        userName,
      } = req.body;
      if (!title || !description || !userName) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      const newPost = await postModel.create(
        title,
        description,
        imagePost,
        userName
      );

      if (!newPost) {
        return res.status(400).json({ error: "Erro ao criar Postagem" });
      }

      res.status(201).json({
        message: "Postagem criada com sucesso",
        newPost
      });
    } catch (error) {
      console.error("Erro ao criar Postagem:", error);
      res.status(500).json({ error: "Erro ao criar Postagem" });
    }
  }
  
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

  async likePost(req, res) {
    try {
      const { title } = req.params;
  
      if (!title) {
        return res.status(400).json({ error: "Título do post é obrigatório" });
      }
  
      const likedPost = await postModel.likePost(title);
  
      if (!likedPost) {
        return res.status(404).json({ error: "Post não encontrado" });
      }
  
      res.status(200).json({
        message: "Post curtido com sucesso",
        likedPost
      });
    } catch (error) {
      console.error("Erro ao curtir postagem:", error);
      res.status(500).json({ error: "Erro ao curtir postagem" });
    }
  }


  async commentPost(req, res) {
    try {
      const { title } = req.params;
  
      if (!title) {
        return res.status(400).json({ error: "Título do post é obrigatório" });
      }
  
      const commented = await postModel.commentPost(title);
  
      if (!commented) {
        return res.status(404).json({ error: "Post não encontrado" });
      }
  
      res.status(200).json({
        message: "Post comentado com sucesso",
        commented
      });
    } catch (error) {
      console.error("Erro ao comentar postagem:", error);
      res.status(500).json({ error: "Erro ao comentar na postagem" });
    }
  }
  
  
}
export default new PostController();