import { AppState } from "../AppState.js";
import { sandboxService } from "../services/SandboxServices.js";
import { Pop } from "../utils/Pop.js";
import { setHTML, setText } from "../utils/Writer.js";
function _drawCurrentTime() {

    const currentTime = new Date()
    setHTML('currentTime', currentTime.toLocaleString())
}
function _drawRandomPicture() {
    const randompicture = AppState.randomPicture
    document.body.style.backgroundImage = `url(${randompicture?.largeImgUrl})`
}

function _drawRandomQuote() {
    const randomQuote = AppState.randomQuote
    document.getElementById('quote').innerText = `${randomQuote.content}`
    document.getElementById('author').innerText = `-${randomQuote.author}`


}

function _drawWeather() {
    const weather = AppState.weather
    document.getElementById('weather').innerText = `${weather.toFixed(0)}℃`
}
export class SandboxController {
    constructor() {
        console.log('sandbox controller loaded');
        this.getRandomPictures()
        this.getRandomQuote()


        AppState.on('randomPicture', _drawRandomPicture)
        _drawCurrentTime()
        setInterval(_drawCurrentTime, 1000)
        this.getWeather()
    }

    async getRandomPictures() {
        try {
            await sandboxService.getRandomPictures()
        } catch (error) {
            Pop.error(error)
            console.error(error);

        }
    }

    async getRandomQuote() {
        try {
            await sandboxService.getRandomQuote()
            _drawRandomQuote()
        } catch (error) {
            Pop.error(error)
            console.error(error);

        }
    }

    async getWeather() {
        try {
            await sandboxService.getWeather()
            _drawWeather()

        } catch (error) {
            Pop.error(error)
            console.error(error);

        }
    }

    async changeWeatherF() {
        try {
            await sandboxService.changeWeatherF()
            const weather = AppState.weather
            document.getElementById('weather').innerText = `${weather.toFixed(0)}℉`

        } catch (error) {
            Pop.error(error)
            console.error(error);

        }
    }
    async changeWeatherC() {
        try {
            await sandboxService.changeWeatherC()
            const weather = AppState.weather
            document.getElementById('weather').innerText = `${weather.toFixed(0)}℃`

        } catch (error) {
            Pop.error(error)
            console.error(error);

        }
    }





}