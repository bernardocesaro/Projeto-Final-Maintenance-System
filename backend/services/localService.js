const prisma = require("../database/prisma");

async function getAllLocals() {
    return await prisma.local.findMany({
        orderBy: {
            id: "desc",
        },
    });
};

async function getLocalById(id) {
    return await prisma.local.findUnique({
        where: {
            id: Number(id),
        },
    });
};

async function createLocal(data, performedById = null) {
    return await prisma.$transaction(async (transaction) => {
        const local = await transaction.local.create({
            data: {
                name: data.name,
                description: data.description ?? null,
                cep: data.cep ?? null,
                street: data.street ?? null,
                number: data.number ?? null,
                complement: data.complement ?? null,
                neighborhood: data.neighborhood ?? null,
                city: data.city ?? null,
                state: data.state ?? null,
            },
        });

        await transaction.logLocal.create({
            data: {
                localId: local.id,
                performedById: performedById,
                action: "Insert",
                message: `Local ${local.name} criado.`,
            },
        });

        return local;
    });
};

async function updateLocal(id, data, performedById = null) {
    return await prisma.$transaction(async (transaction) => {
        const local = await transaction.local.update({
            where: {
                id: Number(id),
            },
            data: {
                name: data.name,
                description: data.description,
                cep: data.cep,
                street: data.street,
                number: data.number,
                complement: data.complement,
                neighborhood: data.neighborhood,
                city: data.city,
                state: data.state,
            },
        });

        await transaction.logLocal.create({
            data: {
                localId: local.id,
                performedById: performedById,
                action: "Update",
                message: `Local ${local.name} atualizado.`,
            },
        });

        return local;
    });
};

async function deleteLocal(id, performedById = null) {
    return await prisma.$transaction(async (transaction) => {
        const local = await transaction.local.delete({
            where: {
                id: Number(id),
            },
        });

        await transaction.logLocal.create({
            data: {
                localId: local.id,
                performedById: performedById,
                action: "Delete",
                message: `Local ${local.name} excluído.`,
            },
        });

        return local;
    });
};

module.exports = {
    getAllLocals,
    getLocalById,
    createLocal,
    updateLocal,
    deleteLocal,
}