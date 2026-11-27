const {
    locationService,
 } = require("../services/locationService");

async function getAllLocations(req, res) {
    try {
        const locations = await locationService.getAllLocations();
        console.info("Sucesso ao buscar os locais!");
        console.table(locations);
        res.status(200).json({
            message: "Sucesso ao buscar os locais!",
            data: locations,
        });
    } catch (error) {
        console.error("Erro ao buscar os locais: ", error);
        res.status(500).json({
            message: "Erro ao buscar os locais!",
        });
    }
};

async function getLocationById(req, res) {
    try {
        const location = await locationService.getLocationById(req.params.id);
        if (!location) {
            console.warn("Nenhum location encontrado: ", req.params.id);
            return res.status(404).json({
                message: "Nenhum location encontrado!",
            });
        }
        console.info("Sucesso ao buscar o location!");
        console.table(location);
        res.status(200).json({
            message: "Sucesso ao buscar o location!",
            data: location,
        });
    } catch (error) {
        console.error("Erro ao buscar o location: ", error);
        res.status(500).json({
            message: "Erro ao buscar o location!",
        });
    }
};

async function createLocation(req, res) {
    try {
        const location = await locationService.createLocation(req.body, req.user?.id || null);
        console.info("Sucesso ao cadastrar o location: ", location);
        res.status(201).json({
            message: "Sucesso ao cadastrar o location!",
            data: location,
        });
    } catch (error) {
        console.error("Erro ao cadastrar o location: ", error);
        res.status(500).json({
            message: "Erro ao cadastrar o location!",
        });
    }
};

async function updateLocation(req, res) {
    try {
        const location = await locationService.updateLocation(req.params.id, req.body, req.user?.id || null);
        console.info("Sucesso ao atualizar o location: ", location);
        res.status(200).json({
            message: "Sucesso ao atualizar o location!",
            data: location,
        });
    } catch (error) {
        console.error("Erro ao atualizar o location: ", error);
        res.status(500).json({
            message: "Erro ao atualizar o location!",
        });
    }
};

async function deleteLocation(req, res) {
    try {
        const location = await locationService.deleteLocation(req.params.id, req.user?.id || null);
        console.info("Sucesso ao excluir o location: ", location);
        res.status(200).json({
            message: "Sucesso ao excluir o location!",
            data: location,
        });
    } catch (error) {
        console.error("Erro ao excluir o location: ", error);
        res.status(500).json({
            message: "Erro ao excluir o location!",
        });
    }
};

module.exports = {
    getAllLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
};