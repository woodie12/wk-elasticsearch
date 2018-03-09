// Get the packages we need
var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    path = require('path'),
    app = express();
const fs = require('fs');
// createNodeAgent(connection, config) {
//     return new AgentKeepAlive(connection.makeAgentConfig(config));
// }


app.use(express.static(__dirname +'/'));
app.use(express.static(path.join(__dirname, './frontend/dist/bundle.js')))

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


var port = process.env.PORT || 8080;



// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};

app.use(allowCrossDomain);


require('./backend/routes')(app, router);

app.route('/').get(function(req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
});


app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, './index.html'));
});

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
