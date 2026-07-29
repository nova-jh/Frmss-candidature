import api from "./api";

const ADMIN_URL = "/candidatures";

const adminService = {

    getAllCandidatures: () => {
        return api.get(ADMIN_URL);
    },

    getCandidatureById: (id) => {
        return api.get(`${ADMIN_URL}/${id}`);
    },
    
    updateStatut: (id, statut) => {
        return api.patch(`${ADMIN_URL}/${id}/statut`, {statut,});
    },

    deleteCandidature: (id) => {
        return api.delete(`${ADMIN_URL}/${id}`);
    },

    getDashboardStats: () => {
        return api.get(`${ADMIN_URL}/dashboard`);
    },
     // Settings endpoints
    updateEmail: (adminId, newEmail) => {
        return api.put(`/admin/${adminId}/email`, { email: newEmail });
    },
    
    updatePassword: (adminId, currentPassword, newPassword) => {
        return api.put(`/admin/${adminId}/password`, {
            currentPassword,
            newPassword,
        });
    },

};

export default adminService;