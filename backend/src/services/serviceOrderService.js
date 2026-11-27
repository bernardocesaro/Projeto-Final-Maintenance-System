const {
    prisma,
} = require("../database/prisma");

async function getAllServiceOrders() {
    return await prisma.serviceOrder.findMany({
        include: {
            equipment: true,
            technician: true,
        },
        orderBy: {
            id: "desc",
        },
    });
};

async function getServiceOrderById(id) {
    return await prisma.serviceOrder.findUnique({
        include: {
            equipment: true,
            technician: true,
        },
        where: {
            id: Number(id),
        },
    });
};

async function createServiceOrder(data, performedById = null) {
    return await prisma.$transaction(async (transaction) => {
        const serviceOrder = await transaction.serviceOrder.create({
            data: {
                equipmentId: Number(data.equipmentId),
                technicianId: Number(data.technicianId),
                description: data.description,
                priority: data.priority,
                date: data.date ? new Date(data.date) : undefined,
                status: data.status ?? "Opened",
            },
        });

        await transaction.logServiceOrder.create({
            data: {
                serviceOrderId: serviceOrder.id,
                performedById: performedById,
                action: "Insert",
                message: `Ordem de Serviço ${serviceOrder.id} criada.`,
            },
        });

        return serviceOrder;
    });
};

async function updateServiceOrder(id, data, performedById = null) {
    return await prisma.$transaction(async (transaction) => {
        const serviceOrder = await transaction.serviceOrder.update({
            where: {
                id: Number(id),
            },
            data: {
                equipmentId: Number(data.equipmentId),
                technicianId: Number(data.technicianId),
                description: data.description,
                priority: data.priority,
                date: data.date ? new Date(data.date) : undefined,
                status: data.status,
            },
        });

        await transaction.logServiceOrder.create({
            data: {
                serviceOrderId: serviceOrder.id,
                performedById: performedById,
                action: "Update",
                message: `Ordem de Serviço ${serviceOrder.id} atualizada.`,
            },
        });

        return serviceOrder;
    });
};

async function deleteServiceOrder(id, performedById = null) {
    return await prisma.$transaction(async (transaction) => {
        const serviceOrder = await transaction.serviceOrder.update({
            where: {
                id: Number(id),
            },
            data: {
                status: "Canceled",
            },
        });

        await transaction.logServiceOrder.create({
            data: {
                serviceOrderId: serviceOrder.id,
                performedById: performedById,
                action: "Delete",
                message: `Ordem de Serviço ${serviceOrder.id} excluída.`,
            },
        });

        return serviceOrder;
    });
};

module.exports = {
    getAllServiceOrders,
    getServiceOrderById,
    createServiceOrder,
    updateServiceOrder,
    deleteServiceOrder,
};