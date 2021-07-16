const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Difine path for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setting up static directory
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        author: 'Yakunin Egor'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'This is dynamic about page',
        author: 'Yakunin Egor'
    })
})

app.get('/help', (req, res) => {
    res.send([
        {
            name: 'Andrew',
            age: "27"
        },
        {
            name: 'Sarah',
            age: "20"
        }
    ])
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.render('pageNotFound', {
            title: 'Please provide the address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, { weatherDescription, temperature, cloudCover }) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                address: req.query.address,
                location,
                weatherDescription,
                temperature,
                cloudCover
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('pageNotFound', {
        title: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('pageNotFound', {
        title: 'Page Not Found'
    })
})

app.listen(6969, () => {
    console.log('Server is up on port 6969')
})

//testing for git ...