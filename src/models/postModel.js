import prisma from "../../prisma/client.js";

class PostModel {
  
  async getAll() {
    const posts = await prisma.post.findMany({
      orderBy: {
        title: 'desc',
      },
      include: {
        user: {
          select: {
            userName: true,
          },
        },
      },
    });

    console.log(posts);

    return posts;
  }
  
  async getByTitle(title) {
    const post = await prisma.post.findUnique({
      where: { title },
      include: {
        user: {
          select: {
            userName: true,
          },
        },
      },
    });

    return post;
  }

  async create(
    title,
    description,
    imagePost,
    userName,
  ) {
    const novoPost = await prisma.post.create({
      data: {
        title,
        description,
        imagePost,
        userName: String(userName),
      },
    });

    return novoPost;
  }

  async likePost(title) {
    const updatedPost = await prisma.post.update({
      where: { title: title },
      data: {
        like: {
          increment: 1, 
        },
      },
    });
  
    return updatedPost;
  }

  async commentPost(title) {
    const updatedPost = await prisma.post.update({
      where: { title: title },
      data: {
        comment: {
          increment: 1, 
        },
      },
    });
  
    return updatedPost;
  }
  
  async update(title, description, imagePost) {
    if (!title) {
      throw new Error('Título é obrigatório para atualizar o post.');
    }
  
    const post = await prisma.post.findUnique({
      where: { title },
      include: { user: { select: { userName: true } } }
    });
  
    if (!post) {
      return null;
    }
  
    const postAtualizado = await prisma.post.update({
      where: { title },
      data: {
        description,
        imagePost,
      },
    });
  
    return postAtualizado;
  }
  
  async delete(title) {
    const post = await this.getByTitle(title);
    if (!post) {
      return null;
    }
    await prisma.post.delete({
      where: { title },
      include: {
        user: {
          select: {
            userName: true,
          },
        },
      },
    });
    return true;
  }
}
export default new PostModel();
