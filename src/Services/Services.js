import axios from "axios";
import { myAxios } from "../Server/MyAxios";

const email=sessionStorage.getItem("id")
export const service={

    getAllDetails:async function(){

    return await myAxios.get(`getAll`).then((res)=>res.data)
 },

 getDescription:async function(){

    return await myAxios.get(`getDesc`).then((res)=>res.data)
 },


 updateDescription:async function(description){

    return await myAxios.put(`update/${email}`,{
        "description":description,
    }).then((res)=>res.data)
 },

}