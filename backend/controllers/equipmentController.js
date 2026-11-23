const equipmentService = require("../services/equipmentService");

async function getAllEquipments(req, res) {
    try {
        const equipments = await equipmentService.getAllEquipments();
        console.info("Sucesso ao buscar os equipamentos!");
        console.table(equipments);
        res.status(200).json({
            message: "Sucesso ao buscar os equipamentos!",
            data: equipments,
        });
    } catch (error) {
        console.error("Erro ao buscar os equipamentos: ", error);
        res.status(500).json({
            message: "Erro ao buscar os equipamentos!"
        });
    }
}

async function getEquipmentById(req, res) {
    try {
        const equipment = await equipmentService.getEquipmentById(req.params.id);
        if (!equipment) {
            console.warn("Nenhum equipmento encontrado: ", req.params.id);
            return res.status(404).json({
                message: "Nenhum equipmento encontrado!"
            });
        }
        console.info("Sucesso ao buscar o equipmento!");
        console.table(equipment);
        res.status(200).json({
            message: "Sucesso ao buscar o equipmento!",
            data: equipment,
        });
    } catch (error) {
        console.error("Erro ao buscar o equipmento: ", error);
        res.status(500).json({
            message: "Erro ao buscar o equipmento!"
        });
    }
}

async function createEquipment(req, res) {
    try {
        const equipment = await equipmentService.createEquipment(req.body, req.user?.id || null);
        console.info("Sucesso ao cadastrar o equipmento: ", equipment);
        res.status(201).json({
            message: "Sucesso ao cadastrar o equipmento!",
            data: equipment,
        });
    } catch (error) {
        console.error("Erro ao cadastrar o equipmento: ", error);
        res.status(500).json({
            message: "Erro ao cadastrar o equipmento!"
        });
    }
};

async function updateEquipment(req, res) {
    try {
        const equipment = await equipmentService.updateEquipment(req.params.id, req.body, req.user?.id || null);
        console.info("Sucesso ao atualizar o equipmento: ", equipment);
        res.status(200).json({
            message: "Sucesso ao atualizar o equipmento!",
            data: equipment,
        });
    } catch (error) {
        console.error("Erro ao atualizar o equipmento: ", error);
        res.status(500).json({
            message: "Erro ao atualizar o equipmento!"
        });
    }
}

async function deleteEquipment(req, res) {
    try {
        const equipment = await equipmentService.deleteEquipment(req.params.id, req.user?.id || null);
        console.info("Sucesso ao excluir o equipmento: ", equipment);
        res.status(200).json({
            message: "Sucesso ao excluir o equipmento!",
            data: equipment,
        });
    } catch (error) {
        console.error("Erro ao excluir o equipmento: ", error);
        res.status(500).json({
            message: "Erro ao excluir o equipmento!"
        });
    }
}

module.exports = {
    getAllEquipments,
    getEquipmentById,
    createEquipment,
    updateEquipment,
    deleteEquipment,
};