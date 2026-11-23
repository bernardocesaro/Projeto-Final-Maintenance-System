const serviceOrderService = require("../services/serviceOrderService");

async function getAllServiceOrders(req, res) {
    try {
        const serviceOrders = await serviceOrderService.getAllServiceOrders();
        console.info("Sucesso ao buscar as ordens de serviço!");
        console.table(serviceOrders);
        res.status(200).json({
            message: "Sucesso ao buscar as ordens de serviço!",
            data: serviceOrders,
        });
    } catch (error) {
        console.error("Erro ao buscar as ordens de serviço: ", error);
        res.status(500).json({
            message: "Erro ao buscar as ordens de serviço!"
        });
    }
}

async function getServiceOrderById(req, res) {
    try {
        const serviceOrder = await serviceOrderService.getServiceOrderById(req.params.id);
        if (!serviceOrder) {
            console.warn("Nenhuma ordem de serviço encontrada: ", req.params.id);
            return res.status(404).json({
                message: "Nenhuma ordem de serviço encontrada!"
            });
        }
        console.info("Sucesso ao buscar a ordem de serviço!");
        console.table(serviceOrder);
        res.status(200).json({
            message: "Sucesso ao buscar a ordem de serviço!",
            data: serviceOrder,
        });
    } catch (error) {
        console.error("Erro ao buscar a ordem de serviço: ", error);
        res.status(500).json({
            message: "Erro ao buscar a ordem de serviço!"
        });
    }
}

async function createServiceOrder(req, res) {
    try {
        const serviceOrder = await serviceOrderService.createServiceOrder(req.body, req.user?.id || null);
        console.info("Sucesso ao cadastrar a ordem de serviço: ", serviceOrder);
        res.status(201).json({
            message: "Sucesso ao cadastrar a ordem de serviço!",
            data: serviceOrder,
        });
    } catch (error) {
        console.error("Erro ao cadastrar a ordem de serviço: ", error);
        res.status(500).json({
            message: "Erro ao cadastrar a ordem de serviço!"
        });
    }
};

async function updateServiceOrder(req, res) {
    try {
        const serviceOrder = await serviceOrderService.updateServiceOrder(req.params.id, req.body, req.user?.id || null);
        console.info("Sucesso ao atualizar a ordem de serviço: ", serviceOrder);
        res.status(200).json({
            message: "Sucesso ao atualizar a ordem de serviço!",
            data: serviceOrder,
        });
    } catch (error) {
        console.error("Erro ao atualizar a ordem de serviço: ", error);
        res.status(500).json({
            message: "Erro ao atualizar a ordem de serviço!"
        });
    }
}

async function deleteServiceOrder(req, res) {
    try {
        const serviceOrder = await serviceOrderService.deleteServiceOrder(req.params.id, req.user?.id || null);
        console.info("Sucesso ao excluir a ordem de serviço: ", serviceOrder);
        res.status(200).json({
            message: "Sucesso ao excluir a ordem de serviço!",
            data: serviceOrder,
        });
    } catch (error) {
        console.error("Erro ao excluir a ordem de serviço: ", error);
        res.status(500).json({
            message: "Erro ao excluir a ordem de serviço!"
        });
    }
}

module.exports = {
    getAllServiceOrders,
    getServiceOrderById,
    createServiceOrder,
    updateServiceOrder,
    deleteServiceOrder,
};