const prisma = require("../database/prisma");

async function getAllLocations() {
    return await prisma.location.findMany({
        orderBy: {
            id: "desc",
        },
    });
};

async function getLocationById(id) {
    return await prisma.location.findUnique({
        where: {
            id: Number(id),
        },
    });
};

async function createLocation(data, performedById = null) {
    return await prisma.$transaction(async (transaction) => {
        const location = await transaction.location.create({
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

        await transaction.logLocation.create({
            data: {
                locationId: location.id,
                performedById: performedById,
                action: "Insert",
                message: `Location ${location.name} criado.`,
            },
        });

        return location;
    });
};

async function updateLocation(id, data, performedById = null) {
    return await prisma.$transaction(async (transaction) => {
        const location = await transaction.location.update({
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

        await transaction.logLocation.create({
            data: {
                locationId: location.id,
                performedById: performedById,
                action: "Update",
                message: `Location ${location.name} atualizado.`,
            },
        });

        return location;
    });
};

async function deleteLocation(id, performedById = null) {
    return await prisma.$transaction(async (transaction) => {
        const location = await transaction.location.delete({
            where: {
                id: Number(id),
            },
        });

        await transaction.logLocation.create({
            data: {
                locationId: location.id,
                performedById: performedById,
                action: "Delete",
                message: `Location ${location.name} excluído.`,
            },
        });

        return location;
    });
};

module.exports = {
    getAllLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
}