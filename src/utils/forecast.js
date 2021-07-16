// this is forecase funcion

const request = require('request')

const forecast = (latitude, longitude, callback) => {
    // for fahrenheit use &units=f'
    const url = 'http://api.weatherstack.com/current?access_key=f3c6e61447bc1d0d5ecf215f238acdea&query=' + latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (!error && !body.error) {
            callback(undefined, {
                temperature: body.current.temperature,
                cloudCover: body.current.cloudcover,
                weatherDescription: body.current.weather_descriptions[0]
            })
        } else {
            body.error
                ? callback('Unable to find location', undefined)
                : callback('Unable to connect to weather service. Here is error message: ', undefined)
        }
    })
}

module.exports = forecast