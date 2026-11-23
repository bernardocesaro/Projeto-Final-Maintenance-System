const userService = require("../services/userService");

async function getAllUsers(req, res) {
    try {
        const users = await userService.getAllUsers();
        console.info("Sucesso ao buscar os usuários!");
        console.table(users);
        res.status(200).json({
            message: "Sucesso ao buscar os usuários!",
            data: users,
        });
    } catch (error) {
        console.error("Erro ao buscar os usuários: ", error);
        res.status(500).json({
            message: "Erro ao buscar os usuários!"
        });
    }
}

async function getUserById(req, res) {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            console.warn("Nenhum usuário encontrado: ", req.params.id);
            return res.status(404).json({
                message: "Nenhum usuário encontrado!"
            });
        }
        console.info("Sucesso ao buscar o usuário!");
        console.table(user);
        res.status(200).json({
            message: "Sucesso ao buscar o usuário!",
            data: user,
        });
    } catch (error) {
        console.error("Erro ao buscar o usuário: ", error);
        res.status(500).json({
            message: "Erro ao buscar o usuário!"
        });
    }
}

async function createUser(req, res) {
    try {
        const user = await userService.createUser(req.body, req.body.firebaseUid, req.user?.id || null);
        console.info("Sucesso ao cadastrar o usuário: ", user);
        res.status(201).json({
            message: "Sucesso ao cadastrar o usuário!",
            data: user,
        });
    } catch (error) {
        console.error("Erro ao cadastrar o usuário: ", error);
        res.status(500).json({
            message: "Erro ao cadastrar o usuário!"
        });
    }
};

async function updateUser(req, res) {
    try {
        const user = await userService.updateUser(req.params.id, req.body, req.user?.id || null);
        console.info("Sucesso ao atualizar o usuário: ", user);
        res.status(200).json({
            message: "Sucesso ao atualizar o usuário!",
            data: user,
        });
    } catch (error) {
        console.error("Erro ao atualizar o usuário: ", error);
        res.status(500).json({
            message: "Erro ao atualizar o usuário!"
        });
    }
}

async function deleteUser(req, res) {
    try {
        const user = await userService.deleteUser(req.params.id, req.user?.id || null);
        console.info("Sucesso ao excluir o usuário: ", user);
        res.status(200).json({
            message: "Sucesso ao excluir o usuário!",
            data: user,
        });
    } catch (error) {
        console.error("Erro ao excluir o usuário: ", error);
        res.status(500).json({
            message: "Erro ao excluir o usuário!"
        });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};