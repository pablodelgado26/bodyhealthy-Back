import prisma from "../../prisma/client.js";

class UserModel {
  getAll = async () => {
    return await prisma.user.findMany();
  }

  getById = async (id) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (error) {
      console.log("Error", error);
      throw error
    }
  }

create = async ( userName, name, email, password, cellPhone, age, sex, height, weight, descriptionObjective, restriction, conditioning) => {
  return await prisma.user.create({
    data: {
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
    },
  });
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
