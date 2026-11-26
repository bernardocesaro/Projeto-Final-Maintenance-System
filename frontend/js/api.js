async function createRequest(endpoint, method, data) {

};

async function getRequest(endpoint) {
    return await createRequest(endpoint, { method: GET });
};

async function postRequest(endpoint, data) {
    return await createRequest(endpoint, { method: POST }, data);
};

async function putRequest(endpoint, data) {
    return await createRequest(endpoint, { method: PUT }, data);
};

async function deleteRequest(endpoint) {
    return await createRequest(endpoint, { method: DELETE });
};

export {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
};