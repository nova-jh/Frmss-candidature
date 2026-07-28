import api from "./api";

const ENSEIGNANT_URL = "/enseignants";

const enseignantService = {

    getAll: () => {
        return api.get(ENSEIGNANT_URL);
    },

    getById: (id) => {
        return api.get(`${ENSEIGNANT_URL}/${id}`);
    },

    delete: (id) => {
        return api.delete(`${ENSEIGNANT_URL}/${id}`);
    },

    exportExcel: () => {
        return api.get(`${ENSEIGNANT_URL}/export-excel`, {
            responseType: "blob",
        });
    },

    getClassement: () => {
        return api.get(`${ENSEIGNANT_URL}/classement`);
    }

};

export default enseignantService;