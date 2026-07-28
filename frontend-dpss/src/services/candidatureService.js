import api from "./api";

const candidatureService = {

    creerCandidature(data) {

        return api.post("/candidatures", data);

    }

};

export default candidatureService;