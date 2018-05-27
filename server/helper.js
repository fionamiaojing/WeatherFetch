const request = require('request');
const db = require('../db/mongoose.js')

var getClimateByCityName = (cityname, callback) => {
    const APP_ID = process.env.OPENWEATHER_API_TOKEN;
    //let weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APP_ID}`;
    let options = {
        url: 'http://api.openweathermap.org/data/2.5/weather',
        qs: {
            q: cityname,
            appid: APP_ID,
            units: 'metric',
        }
    }
    request.get(options, (error, response, body) => {
        let data = JSON.parse(body);
        if (data.cod === 200 ) {
            //deal with data
            let iconID = data['weather'][0]['icon'];
            let revisedData = {
                city: data.name,
                weather: data['weather'][0]['main'],
                temp: data['main']['temp'],
                iconURL: `http://openweathermap.org/img/w/${iconID}.png`
            }
            //send to db
            db.saveToDB(revisedData, () => {
                callback(null, 'Saved');
            });
        } else {
            callback(error, null)
        }
    })
}

var getDataFromDB = (callback) => {
    db.fetchFromDB((err, data) => {
        callback(err, data)
    })
}

module.exports = {
    getClimateByCityName: getClimateByCityName,
    getDataFromDB: getDataFromDB
}
