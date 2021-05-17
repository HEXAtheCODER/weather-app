const request = require('request')

const forecast = (latitude, logitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=c12243b8c007ea60fc556cc3b6ce3ae0&query=' + latitude + ',' + logitude

  request({ url, json: true}, (error, { body }) => {
    if (error) {
      callback('Some error occured', undefined)
    } else if (body.success === false) {
      callback(body.error.info, undefined)
    } else {
      callback(undefined, {
        forecast: `Current temperature is ${body.current.temperature}, it feels like ${body.current.feelslike}`,
        temperature: body.current.temperature,
        feelsLike: body.current.feelslike,
        name: body.location.name,
        country: body.location.country,
        region: body.location.region
      })
    }
  })
}

module.exports = forecast
