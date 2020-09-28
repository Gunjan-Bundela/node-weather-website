const request = require('request') 
const forecast = (longitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2ef0fa434c73e32a181cf1c18043cce4&query='+latitude+','+longitude+ '&units=f'
     request({url, json:true}, (error, { body }) => {
         if(error){
             callback('Unable to connect to weather servics', undefined)
         }
         else if(body.error){
             callback('unable to find weather.Try another search', undefined)
        }
        else
        {
              callback(undefined , 'It is currentily ' + (body.current.weather_descriptions[0])+' but it feels like '+(body.current.feelslike),
        )
         }
        })
 }

 module.exports = forecast



