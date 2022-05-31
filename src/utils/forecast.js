const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1cbc64dbd5e767352f578d8a7cfce7ed&query=' + latitude + ',' + longitude + '&untis=m'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather app!', undefined)

        } else if (body.error) {
            callback('Unable to find location try again!', undefined)

        } else {
            callback(undefined, body.current.weather_descriptions +'. Its is currently ' + body.current.temperature, ' degrees out. and it feels like ' + body.current.feelslike  + ' degrees out.')
        }
    })
}


module.exports = forecast