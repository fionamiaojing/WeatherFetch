const express = require("express");
const app = express();
const helper = require('./helper.js');

app.set("port", process.env.PORT || 3000);
app.use(express.json())

app.use(express.static("client/dist"));

app.post('/climate', (req, res) => {
    console.log('server side data', req.body.data)
    helper.getClimateByCityName(req.body.data, function(err, result) {
        if (err) {
            res.status(500).send('Failed')
        } else {
            res.status(201).send('Success')
        } 
    })
})

app.get('/climate', (req, res) => {
    helper.getDataFromDB((err, data) => {
        if (err) {
            res.status(400).send('Not Found')
        } else {
            res.status(200).send(data.reverse());
        }
    })
})

app.listen(app.get("port"), function() {
    console.log('Listening on port 3000!!!')
})