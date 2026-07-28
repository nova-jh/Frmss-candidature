import api from "./api";

const excelService = {

    exportExcel(type){

        return api.get("/excel/export",{

            params:{type},

            responseType:"blob"

        });

    }

};

export default excelService;