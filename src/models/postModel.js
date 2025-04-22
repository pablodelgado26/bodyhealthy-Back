import prisma from "../../prisma/client.js";

class PostModel {
  getAll = async () => {
    return await prisma.post.findMany();
  }

  getByPostTitle = async (title) => {
    try {
      const post = await prisma.post.findUnique({
        where: { title },
      });

      return post || null;
    } catch (error) {
      console.error(`Erro ao buscar postagem com titulo "${title}":`, error.message, error.stack);
      throw error;
    }
  };


  create = async (req, res) => {
    const {
      title,
      description,
      imagePost,
      like = 0,
      comment = 0,
    } = req.body;

    const userName = req.user?.userName; // pega do usuário autenticado

    try {
      if (!title || !description) {
        return res.status(400).json({
          erro: "Campos obrigatórios: title e description",
        });
      }

      if (!userName) {
        return res.status(401).json({
          erro: "Usuário não autenticado",
        });
      }

      const novoPost = await prisma.post.create({
        data: {
          title,
          description,
          imagePost,
          like,
          comment,
          userName,
        },
      });

      res.status(201).json(novoPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao criar post" });
    }
  };



  update = async (id, dadosAtualizados) => {
    try {
      const postAtualizado = await prisma.post.update({
        where: { id },
        data: {
          title: dadosAtualizados.title,
          description: dadosAtualizados.description,
          imagePost: dadosAtualizados.imagePost,
          // Você pode permitir atualizar like/comment também se quiser
        }
      });
      return postAtualizado;
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
      throw error;
    }
  };

  delete = async (id) => {
    try {
      const postDeletado = await prisma.post.delete({
        where: { id },
      });
      return postDeletado;
    } catch (error) {
      console.error("Erro ao deletar o post:", error);
      throw error;
    }
  };
}
export default new PostModel();
