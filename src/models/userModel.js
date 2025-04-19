import prisma from "../../prisma/client.js";

class UserModel {
  getAll = async () => {
    try {
      const users = await prisma.user.findMany();
      // Serializa BigInt (cellPhone) para string
      return JSON.parse(JSON.stringify(users, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
      ));
    } catch (error) {
      console.error('Erro ao buscar todos os usuários:', error.message, error.stack);
      throw error;
    }
  };

  getById = async (id) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      // Serializa BigInt (cellPhone) para string
      return user ? JSON.parse(JSON.stringify(user, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
      )) : null;
    } catch (error) {
      console.error(`Erro ao buscar usuário com id ${id}:`, error.message, error.stack);
      throw error;
    }
  };

  create = async (data) => {
    try {
      return await prisma.user.create({
        data,
      });
    } catch (error) {
      throw error; // Propaga o erro para o controller tratar
    }
  };


  update = async (id, concluida) => {
    try {
      const user = await prisma.user.update({
        where: { id },
        data: {
          concluida: concluida !== undefined ? concluida : true,
        }
      });
      return user;
    } catch (error) {
      console.log("Error", error);
      throw error
    }
  };

  delete = async (id) => {
    try {
      const tarefaDeletada = await prisma.user.delete({
        where: { id },
      });
      return tarefaDeletada;
    } catch (error) {
      console.error("Error ao deletar a user!", error);
      throw error;
    }
  };
}
export default new UserModel();
