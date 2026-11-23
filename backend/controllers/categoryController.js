const categoryService = require("../services/categoryService");

async function getAllCategorys(req, res) {
    try {
        const categorys = await categoryService.getAllCategorys();
        console.info("Sucesso ao buscar as categorias!");
        console.table(categorys);
        res.status(200).json({
            message: "Sucesso ao buscar as categorias!",
            data: categorys,
        });
    } catch (error) {
        console.error("Erro ao buscar as categorias: ", error);
        res.status(500).json({
            message: "Erro ao buscar as categorias!"
        });
    }
}

async function getCategoryById(req, res) {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        if (!category) {
            console.warn("Nenhuma categoria encontrada: ", req.params.id);
            return res.status(404).json({
                message: "Nenhuma categoria encontrada!"
            });
        }
        console.info("Sucesso ao buscar a categoria!");
        console.table(category);
        res.status(200).json({
            message: "Sucesso ao buscar a categoria!",
            data: category,
        });
    } catch (error) {
        console.error("Erro ao buscar a categoria: ", error);
        res.status(500).json({
            message: "Erro ao buscar a categoria!"
        });
    }
}

async function createCategory(req, res) {
    try {
        const category = await categoryService.createCategory(req.body, req.user?.id || null);
        console.info("Sucesso ao cadastrar a categoria: ", category);
        res.status(201).json({
            message: "Sucesso ao cadastrar a categoria!",
            data: category,
        });
    } catch (error) {
        console.error("Erro ao cadastrar a categoria: ", error);
        res.status(500).json({
            message: "Erro ao cadastrar a categoria!"
        });
    }
};

async function updateCategory(req, res) {
    try {
        const category = await categoryService.updateCategory(req.params.id, req.body, req.user?.id || null);
        console.info("Sucesso ao atualizar a categoria: ", category);
        res.status(200).json({
            message: "Sucesso ao atualizar a categoria!",
            data: category,
        });
    } catch (error) {
        console.error("Erro ao atualizar a categoria: ", error);
        res.status(500).json({
            message: "Erro ao atualizar a categoria!"
        });
    }
}

async function deleteCategory(req, res) {
    try {
        const category = await categoryService.deleteCategory(req.params.id, req.user?.id || null);
        console.info("Sucesso ao excluir a categoria: ", category);
        res.status(200).json({
            message: "Sucesso ao excluir a categoria!",
            data: category,
        });
    } catch (error) {
        console.error("Erro ao excluir a categoria: ", error);
        res.status(500).json({
            message: "Erro ao excluir a categoria!"
        });
    }
}

module.exports = {
    getAllCategorys,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};