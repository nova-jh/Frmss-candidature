import api from "./api";

const ENSEIGNANT_URL = "/enseignants";

const candidatureEnseignantService = {

    envoyer: (data) => {
        return api.post(ENSEIGNANT_URL, data);
    }

};

export default candidatureEnseignantService;