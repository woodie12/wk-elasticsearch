module.exports = function (app, router) {
    app.use('/api', require('./search.js')(router));

};
