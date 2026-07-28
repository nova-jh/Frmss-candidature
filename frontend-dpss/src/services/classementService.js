import api from "./api";

const classementService = {

    getClassementMoyenne() {
        return api.get("/classement/moyenne");
    },

    getClassementNational() {
        return api.get("/classement/national");
    },

    getClassementInternational() {
        return api.get("/classement/international");
    }

};

export default classementService;