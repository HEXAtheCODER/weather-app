const request = require('request')


const geocode = (location, callback) => {
  let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(location) + ".json?access_token=pk.eyJ1Ijoic3JpbWFudGFnYW5ndWx5MDIiLCJhIjoiY2tvMWN5M25jMDgxYjJ4b2k2c2J4YzY0cyJ9.SroOF-WLZWFUljIjHndOxQ"

  request({ url, json: true}, (error, { body }) => {
    if (error) {
      callback('Some error occured', undefined)
    } else if (body.features.length === 0) {
      callback('No match found', undefined)
    } else {
      callback(undefined,{
        coordinates: body.features[0].center
      })
    }
  })
}

module.exports = geocode
