const request = require('request');
const db = require('../db/mongoose.js')

var getClimateByCityName = (cityname, callback) => {
    const APP_ID = "b73e9a6e00e3b3dfbfa769bba2bbca3e";
    let weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APP_ID}`;
    
    request.get(weatherURL, (error, response, body) => {
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
