async function loadComponent(elementId, filePath) {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        const res = await fetch(filePath);
        if (!res.ok) {
            console.error("Erro ao carregar o arquivo: ", filePath);
            throw new Error(`Erro ao carregar ${filePath}`);
        }

        element.innerHTML = await res.text();
        console.info("Sucesso ao carregar o arquivo: ", filePath);
    } catch (error) {
        console.error("Erro ao carregar o arquivo: ", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('footer-placeholder', './footer.html');
});