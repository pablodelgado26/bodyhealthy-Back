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


  update = async (id, name, password, age, sex, height, weight, descriptionObjective, restriction, conditioning, imageProfile) => {
    try {
      const data = {};
      if (name !== undefined) data.name = name;
      if (password !== undefined) data.password = password;
      if (age !== undefined) data.age = parseInt(age);
      if (sex !== undefined) data.sex = sex;
      if (height !== undefined) data.height = parseFloat(height);
      if (weight !== undefined) data.weight = parseFloat(weight);
      if (descriptionObjective !== undefined) data.descriptionObjective = descriptionObjective;
      if (restriction !== undefined) data.restriction = restriction;
      if (conditioning !== undefined) data.conditioning = conditioning;
      if (imageProfile !== undefined) data.imageProfile = imageProfile;
  
      const user = await prisma.user.update({
        where: { id },
        data,
      });
      return JSON.parse(JSON.stringify(user, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
      ));
    } catch (error) {
      console.error(`Erro ao atualizar usuário com id ${id}:`, error.message, error.stack);
      throw error;
    }
  };

  delete = async (id) => {
    try {
      const userDeletado = await prisma.user.delete({
        where: { id },
      });
      return userDeletado;
    } catch (error) {
      console.error("Error ao deletar a user!", error);
      throw error;
    }
  };
}
export default new UserModel();
