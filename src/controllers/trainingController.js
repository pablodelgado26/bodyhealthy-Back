import trainingModel from "../models/trainingModel.js";


class TrainingController {

    async getAll(req, res) {
        try {
            const trainings = await trainingModel.getAll();
            res.json(trainings);
        } catch (error) {
            console.error("Erro ao buscar todos os trainings:", error);
            res.status(500).json({ error: "Erro ao buscar trainings" });
        }
    }

    async getByUser(req, res) {
        try {
            const { userName } = req.params;

            const trainings = await trainingModel.getByUser(userName);

            if (!trainings || trainings.length === 0) {
                return res.status(404).json({ error: "Nenhum treino encontrado para este usuário" });
            }

            res.json(trainings);
        } catch (error) {
            console.error("Erro ao buscar Treinos por usuário:", error);
            res.status(500).json({ error: "Erro ao buscar Treinos por usuário" });
        }
    }

    async createTraining(req, res) {
        try {
            // Validação básica
            const {
                title,
                description,
                userName,
            } = req.body;
            if (!title || !description || !userName) {
                return res
                    .status(400)
                    .json({ error: "Todos os campos são obrigatórios" });
            }

            const newTraining = await trainingModel.create(
                title,
                description,
                userName,
            );

            if (!newTraining) {
                return res.status(400).json({ error: "Erro ao criar Treino" });
            }

            res.status(201).json({
                message: "Treino criada com sucesso",
                newTraining
            });
        } catch (error) {
            console.error("Erro ao criar Treino:", error);
            res.status(500).json({ error: "Erro ao criar Treino" });
        }
    }

async updateTraining(req, res) {
    try {
        const { userName, title } = req.params;
        const { description } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Título do treino é obrigatório." });
        }

        if (!userName) {
            return res.status(400).json({ error: "userName é obrigatório." });
        }

        const trainingAtualizado = await trainingModel.update(
            userName,
            title,
            description
        );

        if (!trainingAtualizado) {
            return res.status(404).json({ error: "Training não encontrado." });
        }

        return res.status(200).json({
            message: "Training atualizado com sucesso.",
            training: trainingAtualizado,
        });
    } catch (error) {
        console.error("Erro ao atualizar treino:", error.message);
        return res.status(500).json({ error: "Erro interno ao atualizar treino." });
    }
}


async deleteTraining(req, res) {
    try {
        const { userName, title } = req.params;

        if (!title) {
            return res.status(400).json({ error: "Título do treino é obrigatório." });
        }

        if (!userName) {
            return res.status(400).json({ error: "userName é obrigatório." });
        }

        const deleted = await trainingModel.delete(userName, title);

        if (!deleted) {
            return res.status(404).json({ error: "Training não encontrado." });
        }

        return res.status(200).json({ message: "Training deletado com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar treino:", error.message);
        return res.status(500).json({ error: "Erro interno ao deletar treino." });
    }
}


}
export default new TrainingController();