import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"

class SandboxService {
    async changeWeatherF() {
        const res = await api.get('api/weather')
        const kelvin = res.data.main.temp
        const celsius = kelvin - 273;
        const fahrenheit = celsius * (9 / 5) + 32;
        AppState.weather = fahrenheit
    }
    async changeWeatherC() {
        const res = await api.get('api/weather')
        const kelvin = res.data.main.temp
        const celsius = kelvin - 273;
        const fahrenheit = celsius * (9 / 5) + 32;
        AppState.weather = celsius
    }
    async getRandomQuote() {
        const res = await api.get('api/quotes')
        // console.log('quotes', res.data);
        AppState.randomQuote = res.data
        // console.log('appstate quote', AppState.randomQuote);
    }
    async getWeather() {
        const res = await api.get('api/weather')
        const kelvin = res.data.main.temp;
        const celsius = kelvin - 273;
        const fahrenheit = celsius * (9 / 5) + 32;
        AppState.weather = celsius
        console.log('weather', fahrenheit);


    }
    async getRandomPictures() {
        const res = await api.get('api/images')
        // console.log('image', res.data)
        AppState.randomPicture = res.data
        // console.log('image in appstate', AppState.randomPicture);

    }


}

export const sandboxService = new SandboxService()