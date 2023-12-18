import axios from "axios";

export const baseUrl="https://mywebsite-94hc.onrender.com/api/V1/myprofile"

export const myAxios = axios.create({
    baseURL: `${baseUrl}`
})

myAxios.interceptors.request.use(
    function (req) {
       
        const token = sessionStorage.getItem("token")
        if (token) {
            req.headers.Authorization= `Bearer ${token}`;
            req.headers["Content-Type"]= 'application/json'
        }
        return req;
    },function (error) {
        
        return Promise.reject(error);
    }
);

myAxios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);
