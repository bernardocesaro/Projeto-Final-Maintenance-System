const {
    prisma,
} = require("../database/prisma");

async function getAllCategories() {
    return await prisma.category.findMany({
        orderBy: {
            id: "desc",
        },
    });
};

async function getCategoryById(id) {
    return await prisma.category.findUnique({
        where: {
            id: Number(id),
        },
    });
};

async function createCategory(data, performedById = null) {
    return await prisma.$transaction(async (transaction) => {
        const category = await transaction.category.create({
            data: {
                name: data.name,
                description: data.description ?? null,
            },
        });

        await transaction.logCategory.create({
            data: {
                categoryId: category.id,
                performedById: performedById,
                action: "Insert",
                message: `Categoria ${category.name} criada.`,
            },
        });

        return category;
    });
};

async function updateCategory(id, data, performedById = null) {
    return await prisma.$transaction(async (transaction) => {
        const category = await transaction.category.update({
            where: {
                id: Number(id),
            },
            data: {
                name: data.name,
                description: data.description,
            },
        });

        await transaction.logCategory.create({
            data: {
                categoryId: category.id,
                performedById: performedById,
                action: "Update",
                message: `Categoria ${category.name} atualizada.`,
            },
        });

        return category;
    });
};

async function deleteCategory(id, performedById = null) {
    return await prisma.$transaction(async (transaction) => {
        const category = await transaction.category.delete({
            where: {
                id: Number(id),
            },
        });

        await transaction.logCategory.create({
            data: {
                categoryId: category.id,
                performedById: performedById,
                action: "Delete",
                message: `Categoria ${category.name} excluída.`,
            },
        });

        return category;
    });
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};