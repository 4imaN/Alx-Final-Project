import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios"
import Cookies from "js-cookie"


const api: AxiosInstance = axios.create({
    baseURL: "http://54.197.44.144/", 
    withCredentials: true, 
})


api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        
        const token = Cookies.get("access_token")

        
        if (config.headers) {
            
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
                config.headers["Content-Type"] = "application/json"
            }
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)


export default api
