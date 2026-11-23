const prisma = require("../database/prisma");

async function getAllTechnicians() {
    return await prisma.technician.findMany({
        orderBy: {
            id: "desc",
        },
    });
};

async function getTechnicianById(id) {
    return await prisma.technician.findUnique({
        where: {
            id: Number(id),
        },
    });
};

async function createTechnician(data, performedById = null) {
    return await prisma.$transaction(async (transaction) => {
        const technician = await transaction.technician.create({
            data: {
                name: data.name,
                cellphone: data.cellphone,
                email: data.email,
                specialty: data.specialty,
                status: data.status ?? "Active",
            },
        });

        await transaction.logTechnician.create({
            data: {
                technicianId: technician.id,
                performedById: performedById,
                action: "Insert",
                message: `Técnico ${technician.name} criado.`,
            },
        });

        return technician;
    });
};

async function updateTechnician(id, data, performedById = null) {
    return await prisma.$transaction(async (transaction) => {
        const technician = await transaction.technician.update({
            where: {
                id: Number(id),
            },
            data: {
                name: data.name,
                cellphone: data.cellphone,
                email: data.email,
                specialty: data.specialty,
                status: data.status,
            },
        });

        await transaction.logTechnician.create({
            data: {
                technicianId: technician.id,
                performedById: performedById,
                action: "Update",
                message: `Técnico ${technician.name} atualizado.`,
            },
        });

        return technician;
    });
};

async function deleteTechnician(id, performedById = null) {
    return await prisma.$transaction(async (transaction) => {
        const technician = await transaction.technician.update({
            where: {
                id: Number(id),
            },
            data: {
                status: "Inactive",
            },
        });

        await transaction.logTechnician.create({
            data: {
                technicianId: technician.id,
                performedById: performedById,
                action: "Delete",
                message: `Técnico ${technician.name} excluído.`,
            },
        });

        return technician;
    });
};

module.exports = {
    getAllTechnicians,
    getTechnicianById,
    createTechnician,
    updateTechnician,
    deleteTechnician,
}