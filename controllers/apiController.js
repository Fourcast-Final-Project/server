'use strict'
const axios = require('axios');

class APIController {
    static show(req, res, next){
        let { loc } = req.params
        //console.log(loc,"masukl")
        let url = 'http://api.openweathermap.org/data/2.5/weather'
        axios.get(url, {
            params: {
                q: loc,
                appid: '733d409fb13b69cd6c672636fce838ba' //process.env.WEATHER_API_ID
            }
        })
        .then(response => {
            //console.log(response.data)
            // res.status(200).json({ weather: response.data  })
            res.status(200).json({ name: response.data.name, weather: response.data.weather, main : response.data.main })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = APIController;