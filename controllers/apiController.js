'use strict'
const axios = require('axios');

class APIController {
    static show(req, res, next){
        let { loc } = req.params
        //console.log(loc,process.env.WEATHER_API_KEY, "masukl")
        let url = 'http://api.openweathermap.org/data/2.5/weather'
        axios.get(url, {
            params: {
                q: loc,
                appid: process.env.WEATHER_API_KEY
            }
        })
        .then(response => {
            console.log(response.data)
            res.status(200).json({ name: response.data.name, weather: response.data.weather, main : response.data.main })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = APIController;