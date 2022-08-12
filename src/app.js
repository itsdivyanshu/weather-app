const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getWeather = require('./utils/getWeather')
const port = process.env.PORT || 3000

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Divyanshu Singh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Divyanshu Singh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        description: 'This is the help page of the Weather App',
        name: 'Divyanshu Singh'
    })
})


app.get('/weather', (req, res) => {
    
    if(!req.query.address)
    {
        return res.send({
            error: 'Address not provided'
        })
    }

    getWeather(req.query.address, (error, {location, forecast} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        else {
            return res.send({
                location,
                forecast,
                address: req.query.address
            })
        }
    })
})
 

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Divyanshu Singh',
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Divyanshu Singh',
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server started on port ' + port);
})
