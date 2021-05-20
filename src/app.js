const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(path.join(__dirname,'../public')))
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
  res.render('index.hbs', {
    title: 'Weather',
    description: 'The weather forecast app.',
    name: 'srimanta'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About',
    description: 'About the developer.',
    name: 'srimanta'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    description: 'This is the help page.',
    name: 'srimanta'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Enter address.'
    })  
  }

  geocode(req.query.address, (error, response) => {
    if(error) return res.send({ error })
    forecast(response.coordinates[1], response.coordinates[0] , (error, response) => {
      if(error) return res.send({ error })
      res.send(response)
    })
  })

})

app.get('/help/*', (rq, res) => {
  res.render('404', {
    typeOfError: '404! Help article not found',
    name: 'srimanta'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    typeOfError: '404! Page not found',
    name: 'srimanta'
  })
})


app.listen(port, () => {
  console.log('Server is running')
})
