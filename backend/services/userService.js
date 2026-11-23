const prisma = require("../database/prisma");

async function getAllUsers() {
    return await prisma.user.findMany({
        orderBy: {
            id: "desc",
        },
    });
};

async function getUserById(id) {
    return await prisma.user.findUnique({
        where: {
            id: Number(id),
        },
    });
};

async function createUser(data, firebaseUid, performedById = null) {
    return await prisma.$transaction(async (transaction) => {
        const user = await transaction.user.create({
            data: {
                firebaseUid: firebaseUid,
                name: data.name,
                email: data.email,
                role: data.role,
                status: data.status ?? "Active",
                lastAccess: data.lastAccess ?? new Date(),
            },
        });

        await transaction.logUser.create({
            data: {
                userId: user.id,
                performedById: performedById,
                action: "Insert",
                message: `Usuário ${user.name} criado.`,
            },
        });

        return user;
    });
};

async function updateUser(id, data, performedById = null) {
    return await prisma.$transaction(async (transaction) => {
        const user = await transaction.user.update({
            where: {
                id: Number(id),
            },
            data: {
                name: data.name,
                email: data.email,
                role: data.role,
                status: data.status,
                lastAccess: data.lastAccess,
            },
        });

        await transaction.logUser.create({
            data: {
                userId: user.id,
                performedById: performedById,
                action: "Update",
                message: `Usuário ${user.name} atualizado.`,
            },
        });

        return user;
    });
};

async function deleteUser(id, performedById = null) {
    return await prisma.$transaction(async (transaction) => {
        const user = await transaction.user.update({
            where: {
                id: Number(id),
            },
            data: {
                status: "Inactive",
            },
        });

        await transaction.logUser.create({
            data: {
                userId: user.id,
                performedById: performedById,
                action: "Delete",
                message: `Usuário ${user.name} excluído.`,
            },
        });

        return user;
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}