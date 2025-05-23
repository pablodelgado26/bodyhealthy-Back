import exerciseModel from "../models/exerciseModel.js";


class ExerciseController {

    async getAll(req, res) {
        try {
            const exercises = await exerciseModel.getAll();
            res.json(exercises);
        } catch (error) {
            console.error("Erro ao buscar todos os exercises:", error);
            res.status(500).json({ error: "Erro ao buscar exercises" });
        }
    }

    async getByTitle(req, res) {
        try {
            const { title } = req.params;

            const titulo = await exerciseModel.getByTitle(title);

            if (!titulo) {
                return res.status(404).json({ error: "Exercício não encontrada" });
            }

            res.json(titulo);
        } catch (error) {
            console.error("Erro ao buscar Exercício:", error);
            res.status(500).json({ error: "Erro ao buscar Exercício" });
        }
    }

    async createExercise(req, res) {
        try {
            // Validação básica
            const {
                title,
                muscleGroup,
                repetitions,
                series,
                training,
                userName
            } = req.body;
            if (!title || !muscleGroup || !repetitions || !series || !training || !userName) {
                return res
                    .status(400)
                    .json({ error: "Todos os campos são obrigatórios" });
            }

            const newExercise = await exerciseModel.create(
                title,
                muscleGroup,
                repetitions,
                series,
                training,
                userName
            );

            if (!newExercise) {
                return res.status(400).json({ error: "Erro ao criar Exercício" });
            }

            res.status(201).json({
                message: "Exercício criada com sucesso",
                newExercise
            });
        } catch (error) {
            console.error("Erro ao criar Exercício:", error);
            res.status(500).json({ error: "Erro ao criar Exercício" });
        }
    }

    async updateExercise(req, res) {
        try {
            const { title } = req.params;
            const { muscleGroup, repetitions, series} = req.body;

            if (!title) {
                return res.status(400).json({ error: "Título do exercício é obrigatório." });
            }

            const exerciseAtualizado = await exerciseModel.update(
                title,
                muscleGroup,
                repetitions,
                series
            );

            if (!exerciseAtualizado) {
                return res.status(404).json({ error: "exercise não encontrado." });
            }

            res.status(200).json({
                message: "exercise atualizado com sucesso.",
                exercise: exerciseAtualizado,
            });
        } catch (error) {
            console.error("Erro ao atualizar exercício:", error.message);
            res.status(500).json({ error: "Erro ao atualizar exercício." });
        }
    }

    async delete(req, res) {
        try {
            const { title } = req.params;
            
            const result = await exerciseModel.delete(title);

            if (!result) {
                return res.status(404).json({ error: "Exercício não encontrado" });
            }

            res.status(204).end(); // Resposta sem conteúdo
        } catch (error) {
            console.error("Erro ao remover exercício:", error);
            res.status(500).json({ error: "Erro ao remover exercício" });
        }
    }

}
export default new ExerciseController();