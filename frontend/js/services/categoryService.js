import { api } from "../api.js";

async function getAllCategories() {
    return await api.get('/category');
};

async function getCategoryById(id) {
    return await api.get(`/category/${id}`);
};

async function createCategory(data) {
    return await api.post("/category", data);
};

async function updateCategory(id, data) {
    return await api.put(`/category/${id}`, data);
};

async function deleteCategory(id) {
    return await api.delete(`/category/${id}`);
};

export {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};