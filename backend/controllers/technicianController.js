const technicianService = require("../services/technicianService");

async function getAllTechnicians(req, res) {
    try {
        const technicians = await technicianService.getAllTechnicians();
        console.info("Sucesso ao buscar os técnicos!");
        console.table(technicians);
        res.status(200).json({
            message: "Sucesso ao buscar os técnicos!",
            data: technicians,
        });
    } catch (error) {
        console.error("Erro ao buscar os técnicos: ", error);
        res.status(500).json({
            message: "Erro ao buscar os técnicos!"
        });
    }
}

async function getTechnicianById(req, res) {
    try {
        const technician = await technicianService.getTechnicianById(req.params.id);
        if (!technician) {
            console.warn("Nenhum técnico encontrado: ", req.params.id);
            return res.status(404).json({
                message: "Nenhum técnico encontrado!"
            });
        }
        console.info("Sucesso ao buscar o técnico!");
        console.table(technician);
        res.status(200).json({
            message: "Sucesso ao buscar o técnico!",
            data: technician,
        });
    } catch (error) {
        console.error("Erro ao buscar o técnico: ", error);
        res.status(500).json({
            message: "Erro ao buscar o técnico!"
        });
    }
}

async function createTechnician(req, res) {
    try {
        const technician = await technicianService.createTechnician(req.body, req.user?.id || null);
        console.info("Sucesso ao cadastrar o técnico: ", technician);
        res.status(201).json({
            message: "Sucesso ao cadastrar o técnico!",
            data: technician,
        });
    } catch (error) {
        console.error("Erro ao cadastrar o técnico: ", error);
        res.status(500).json({
            message: "Erro ao cadastrar o técnico!"
        });
    }
};

async function updateTechnician(req, res) {
    try {
        const technician = await technicianService.updateTechnician(req.params.id, req.body, req.user?.id || null);
        console.info("Sucesso ao atualizar o técnico: ", technician);
        res.status(200).json({
            message: "Sucesso ao atualizar o técnico!",
            data: technician,
        });
    } catch (error) {
        console.error("Erro ao atualizar o técnico: ", error);
        res.status(500).json({
            message: "Erro ao atualizar o técnico!"
        });
    }
}

async function deleteTechnician(req, res) {
    try {
        const technician = await technicianService.deleteTechnician(req.params.id, req.user?.id || null);
        console.info("Sucesso ao excluir o técnico: ", technician);
        res.status(200).json({
            message: "Sucesso ao excluir o técnico!",
            data: technician,
        });
    } catch (error) {
        console.error("Erro ao excluir o técnico: ", error);
        res.status(500).json({
            message: "Erro ao excluir o técnico!"
        });
    }
}

module.exports = {
    getAllTechnicians,
    getTechnicianById,
    createTechnician,
    updateTechnician,
    deleteTechnician,
};