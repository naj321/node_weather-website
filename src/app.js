const path = require ('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { callbackify } = require('util')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup for handlebars engin and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Naj'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Naj'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        helpText: 'this is a very helpfull text',
        title: 'Help',
        name: 'Naj'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must preovide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
       if (error) {
        return res.send({ 
            error: error
        })
       }

       forecast(latitude, longitude,(error, forecastData) => {
           if (error) {
               return res.send({
                   error: error
               })
           }

           res.send({
               forecast: forecastData,
               location: location,
               address: req.query.address
           })
       })
        
    })
   
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({ 
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Naj',
        errorMessage: 'help article can not be found'
    } )
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Naj',
        errorMessage: 'page not found'

    })
})

app.listen(3000, () => {
    console.log('Server started on port 3000!')
})