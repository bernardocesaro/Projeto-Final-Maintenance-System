const localService = require("../services/localService");

async function getAllLocals(req, res) {
    try {
        const locals = await localService.getAllLocals();
        console.info("Sucesso ao buscar os locais!");
        console.table(locals);
        res.status(200).json({
            message: "Sucesso ao buscar os locais!",
            data: locals,
        });
    } catch (error) {
        console.error("Erro ao buscar os locais: ", error);
        res.status(500).json({
            message: "Erro ao buscar os locais!"
        });
    }
}

async function getLocalById(req, res) {
    try {
        const local = await localService.getLocalById(req.params.id);
        if (!local) {
            console.warn("Nenhum local encontrado: ", req.params.id);
            return res.status(404).json({
                message: "Nenhum local encontrado!"
            });
        }
        console.info("Sucesso ao buscar o local!");
        console.table(local);
        res.status(200).json({
            message: "Sucesso ao buscar o local!",
            data: local,
        });
    } catch (error) {
        console.error("Erro ao buscar o local: ", error);
        res.status(500).json({
            message: "Erro ao buscar o local!"
        });
    }
}

async function createLocal(req, res) {
    try {
        const local = await localService.createLocal(req.body, req.user?.id || null);
        console.info("Sucesso ao cadastrar o local: ", local);
        res.status(201).json({
            message: "Sucesso ao cadastrar o local!",
            data: local,
        });
    } catch (error) {
        console.error("Erro ao cadastrar o local: ", error);
        res.status(500).json({
            message: "Erro ao cadastrar o local!"
        });
    }
};

async function updateLocal(req, res) {
    try {
        const local = await localService.updateLocal(req.params.id, req.body, req.user?.id || null);
        console.info("Sucesso ao atualizar o local: ", local);
        res.status(200).json({
            message: "Sucesso ao atualizar o local!",
            data: local,
        });
    } catch (error) {
        console.error("Erro ao atualizar o local: ", error);
        res.status(500).json({
            message: "Erro ao atualizar o local!"
        });
    }
}

async function deleteLocal(req, res) {
    try {
        const local = await localService.deleteLocal(req.params.id, req.user?.id || null);
        console.info("Sucesso ao excluir o local: ", local);
        res.status(200).json({
            message: "Sucesso ao excluir o local!",
            data: local,
        });
    } catch (error) {
        console.error("Erro ao excluir o local: ", error);
        res.status(500).json({
            message: "Erro ao excluir o local!"
        });
    }
}

module.exports = {
    getAllLocals,
    getLocalById,
    createLocal,
    updateLocal,
    deleteLocal,
};