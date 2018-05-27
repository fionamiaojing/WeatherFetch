const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var climateSchema = mongoose.Schema({
    city:  String, //name
    weather: String, //weather.main
    temp: Number, //main.temp
    iconURL: String, //url
});


var Climate = mongoose.model('Climate', climateSchema);

let saveToDB = (data, callback) => {
    let condition = {city: data.city}
    Climate.findOneAndUpdate(condition, data, function(err, obj) {
        if (obj) {
            console.log('updated');
        } else {
            let clima = new Climate(data);
            clima.save()
        }
        callback()
    })
}

let fetchFromDB = (callback) => {
    Climate.find((err, data) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, data)
        }
    })
}


module.exports = {
    saveToDB: saveToDB,
    fetchFromDB: fetchFromDB
}