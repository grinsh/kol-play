import axios from "axios"
let baseUrl="http://localhost:8000/Takanon";

export const getTakanon=()=>{
    return axios.get(`${baseUrl}/getTakanon`)
}

export const updateTakanon=(updateTakanon)=>{
    return axios.put(`${baseUrl}/updateTakanon`,updateTakanon);
}
