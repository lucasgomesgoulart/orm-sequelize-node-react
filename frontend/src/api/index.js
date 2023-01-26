import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:3000'
})

api.interceptors.request.use(async (config) => {
    try {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
    } catch (e) {
        console.log(e)
    }
    console.log({config})
    return config;
    
})

export default api