import prisma from "../../prisma/client.js";

class UserModel {

  async getAll() {
    try {
      const users = await prisma.user.findMany({
        orderBy: {
          userName: 'desc',
        },
        include: {
          posts: {
            select: {
              title: true,
            },
          },
          trainings: {
            select: {
              title: true,
            },
          },
        },
      });

      // Serializa BigInt (cellPhone) para string
      const serializedUsers = JSON.parse(JSON.stringify(users, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
      ));

      return serializedUsers;
    } catch (error) {
      console.error('Erro ao buscar todos os usuários:', error.message, error.stack);
      throw error;
    }
  }

  async getByUserName(userName) {
    try {
      const user = await prisma.user.findUnique({
        where: { userName },
        include: {
          posts: {
            select: {
              title: true,
            },
          },
          trainings: {
            select: {
              title: true,
            },
          },
        },
      });

      return user || null;
    } catch (error) {
      console.error(`Erro ao buscar usuário com userName "${userName}":`, error.message, error.stack);
      throw error;
    }
  }

  async findByUserNameOrEmail(userName, email) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { userName },
          { email },
        ],
      },
    });

    return user;
  }

  async create(data) {
    try {
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
      } = data;

      const parsedCellPhone = BigInt(cellPhone);

      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { userName },
            { email },
            { cellPhone: parsedCellPhone },
          ],
        },
      });

      if (existingUser) {
        if (existingUser.userName === userName) {
          throw new Error("Nome de usuário já cadastrado.");
        }
        if (existingUser.email === email) {
          throw new Error("E-mail já cadastrado.");
        }
        if (existingUser.cellPhone === parsedCellPhone) {
          throw new Error("Número de celular já cadastrado.");
        }
      }

      const userToCreate = {
        userName,
        name,
        email,
        password,
        cellPhone: parsedCellPhone,
        age,
        sex,
        height,
        weight,
        descriptionObjective,
        restriction,
        conditioning,
        imageProfile,
      };

      return await prisma.user.create({
        data: userToCreate,
      });
    } catch (error) {
      throw error;
    }
  }

  async update(userName, name, password, age, sex, height, weight, descriptionObjective, restriction, conditioning, imageProfile) {
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
        where: { userName },
        data,
      });
      return JSON.parse(JSON.stringify(user, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
      ));
    } catch (error) {
      console.error(`Erro ao atualizar usuário com userName ${userName}:`, error.message, error.stack);
      throw error;
    }
  }

  async delete(userName) {
    try {
      const userDeletado = await prisma.user.delete({
        where: { userName },
      });
      return userDeletado;
    } catch (error) {
      console.error("Erro ao deletar o usuário!", error);
      throw error;
    }
  }

}
export default new UserModel();
