const prisma = require("../database/prisma");

async function getAllEquipments() {
    return await prisma.equipment.findMany({
        include: { 
            category: true,
            local: true,
        },
        orderBy: {
            id: "desc",
        },
    });
};

async function getEquipmentById(id) {
    return await prisma.equipment.findUnique({
        include: { 
            category: true,
            local: true,
        },
        where: {
            id: Number(id),
        },
    });
};

async function createEquipment(data, performedById = null) {
    return await prisma.$transaction(async (transaction) => {
        const equipment = await transaction.equipment.create({
            data: {
                name: data.name,
                patrimony: data.patrimony,
                categoryId: Number(data.categoryId),
                localId: Number(data.localId),
                acquisitionDate: data.acquisitionDate ? new Date(data.acquisitionDate) : null,
                status: data.status ?? "Active",
                image: data.image ?? null,
            },
        });

        await transaction.logEquipment.create({
            data: {
                equipmentId: equipment.id,
                performedById: performedById,
                action: "Insert",
                message: `Equipamento ${equipment.name} criado.`,
            },
        });

        return equipment;
    });
};

async function updateEquipment(id, data, performedById = null) {
    return await prisma.$transaction(async (transaction) => {
        const equipment = await transaction.equipment.update({
            where: {
                id: Number(id),
            },
            data: {
                name: data.name,
                patrimony: data.patrimony,
                categoryId: Number(data.categoryId),
                localId: Number(data.localId),
                acquisitionDate: data.acquisitionDate ? new Date(data.acquisitionDate) : null,
                status: data.status,
                image: data.image,
            },
        });

        await transaction.logEquipment.create({
            data: {
                equipmentId: equipment.id,
                performedById: performedById,
                action: "Update",
                message: `Equipamento ${equipment.name} atualizado.`,
            },
        });

        return equipment;
    });
};

async function deleteEquipment(id, performedById = null) {
    return await prisma.$transaction(async (transaction) => {
        const equipment = await transaction.equipment.update({
            where: {
                id: Number(id),
            },
            data: {
                status: "Inactive",
            },
        });

        await transaction.logEquipment.create({
            data: {
                equipmentId: equipment.id,
                performedById: performedById,
                action: "Delete",
                message: `Equipamento ${equipment.name} excluído.`,
            },
        });

        return equipment;
    });
};

module.exports = {
    getAllEquipments,
    getEquipmentById,
    createEquipment,
    updateEquipment,
    deleteEquipment,
}