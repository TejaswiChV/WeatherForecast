import axios from "axios"
export const getWeatherData = (url)=>{
    return axios.get(url)
        .then((res)=>res)
        .catch((err)=>err)
}