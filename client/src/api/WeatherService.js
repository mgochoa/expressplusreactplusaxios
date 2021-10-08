import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://api.openweathermap.org"
})

class WeatherService {
    currentWeather = "/data/2.5/weather"
    instance = axiosInstance

    async city(cityName) {
        return this.instance.get(this.currentWeather, {
            params: {
                q: cityName,
                appid: process.env.REACT_APP_APIKEY
            }
        })
    }
}

export default WeatherService