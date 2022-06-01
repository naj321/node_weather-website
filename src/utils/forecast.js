const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c10da58d16c7fb52ebd084c6a15f04f6&query=' + latitude + ',' + longitude + '&untis=m'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather app!', undefined)

        } else if (body.error) {
            callback('Unable to find location try again!', undefined)

        } else {
            callback(undefined,'It is ' + body.current.weather_descriptions[0] +'. Its is currently ' + body.current.temperature + ' degrees out, and it feels like ' + body.current.feelslike  + ' degrees out. the humidity is ' + body.current.humidity)
        }
    })
}


module.exports = forecast