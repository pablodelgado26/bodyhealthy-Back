import prisma from "../../prisma/client.js";

class ExerciseModel {

    async getAll() {
        const exercises = await prisma.exercise.findMany({
            orderBy: {
                title: 'desc',
            },
            include: {
                training: {
                    select: {
                        title: true,
                        description: true,
                    },
                },
                user: {
                    select: {
                        userName: true,
                    },
                },
            },
        });

        console.log(exercises);

        return exercises;
    }

    async getByTitleAndUserName(title, userName) {
        const exercise = await prisma.exercise.findMany({
            where: {
                user: {
                    userName,
                },
                training: {
                    title,
                },

            },
        });
        return exercise;
    }

    async create(
        title,
        muscleGroup,
        repetitions,
        series,
        imageExercise,
        description,
        userName,
        training,
    ) {
        const novoExercise = await prisma.exercise.create({
            data: {
                title,
                muscleGroup,
                repetitions,
                series,
                imageExercise,
                description,
                user: {
                    connect: {
                        userName,
                    },
                },
                training: {
                    connect: {
                        title: training,
                    },
                },
            },
        });

        return novoExercise;
    }

    async delete(title) {
        const exercise = await this.getByTitle(title);
        if (!exercise) {
            return null;
        }
        await prisma.exercise.delete({
            where: { title },
        });
        return true;
    }
}
export default new ExerciseModel();
