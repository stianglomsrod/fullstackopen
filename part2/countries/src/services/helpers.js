import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/'
const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const getAll = () => {
    const request = axios.get(`${baseURL}all`)
    return request.then((response) => response.data)
}

const getWeather = (lat, lon) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    return request.then((response) => response.data)

}

export default {getAll, getWeather}