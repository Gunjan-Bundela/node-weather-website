const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?limit=1&access_token=pk.eyJ1IjoiZ3VuamFuYnVuZGVsYTIyMDkiLCJhIjoiY2thaTE3anE0MGR1MjJ5dGlueDd2ZmhkZyJ9.bpSvDZ89WuBpa5bEVgHOYA'
    request({url,json:true},(error, {body}) => {
        if(error){
            callback('Unable to connect to location servics',undefined)
        }else if(!body.features){
            callback('unable to find location.Try another search',undefined)
        }else{
            callback(undefined,{
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                place:body.features[0].place_name

            })
        }
    
    })
 
}

module.exports= geocode