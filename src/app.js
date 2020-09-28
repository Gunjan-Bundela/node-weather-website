const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//define path for express configuration:
const publicDirectoryPath = path.join(__dirname,'../public')
const viewpath =path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars enGINE anD views in handlebars 
app.set('view engine','hbs')
app.set('views', viewpath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'weather' ,
        name: "gunjan"
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'about' ,
        name: "me"})
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title:' help',
        name: 'its gunjan'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: "you must provide address"
        })
    }

    geocode (req.query.address,(error,{latitude,longitude,place} = {} ) => {
        if(error){
            return res.send({
                error
            }) 
        }
        forecast(longitude,latitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                place,
                address: req.query.address
            })
       })
  })
    
})

app.get('/products',(req, res)=>{
    if(!req.query.search){
       return res.send({
           error: 'you must provide search term'
       })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
    
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: "gunjan",
        errormessage: 'Help article  not found!'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: "gunjan",
        errormessage: 'Page not found!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
