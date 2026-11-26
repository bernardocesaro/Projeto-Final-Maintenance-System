import {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../services/categoryService.js";

const DOM = {
    elementCategoryTableHead: document.getElementById("#categoryTableHead"),
    elementcategoryTableBody: document.getElementById("#categoryTableBody"),
};

const COLUMNS_TABLE_CATEGORY = [
    { name: "Nome" },
    { name: "Descrição" },
    { name: "Ações" }
];

function loadCategoryTableHead(elementTableHead, fields) {
    elementTableHead.innerHTML = "";
    const elementTableRow = document.createElement("tr");

    fields.forEach(field => {
        const elementTableHead = document.createElement("th");
        elementTableHead.textContent = field.name; 
        elementTableRow.appendChild(elementTableHead);
    });
    elementTableHead.innerHTML = appendChild(elementTableRow);
};

function renderCategoryTableBody(elementTableBody, categories) {
    elementTableBody.innerHTML = "";
    const elementTableRow = document.createElement("tr");

    categories.forEach(category => {
        const elementTableData = document.createElement("td");
        elementTableBody.textContent = category.name; 
        elementTableRow.appendChild(elementTableData);
    });
    elementTableBody.innerHTML = appendChild(elementTableRow);
};

async function init() {
    loadCategoryTableHead(DOM.elementCategoryTableHead, COLUMNS_TABLE_CATEGORY);

    try {
        const categories = await getAllCategories();
        renderCategoryTableBody(DOM.elementcategoryTableBody, categories);
    } catch (error) {
        console.error("Erro ao carregar as categorias: ", error);
    }
}

document.addEventListener('DOMContentLoaded', init);