// app/routes.js

// grab the nerd model we just created
var Nerd = require('./models/nerd');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        app.get('/api/nerds', function(req, res) {
            // use mongoose to get all nerds in the database
//            res.send("Get request");
            Nerd.find(function(err, nerds) {

                // if there is an error retrieving, send the error.
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(nerds); // return all nerds in JSON format
            });
        });

        // route to handle creating goes here (app.post)
        app.post('/api/nerds', function(req, res) {
            var nerd = new Nerd();
            nerd.name = req.body.name;

            nerd.save(function(err) {
                if(err) {
                    res.json({
                        success: false,
                        message: err
                    });
                }

                res.json({
                    success: true,
                    message: 'Nerd created'
                });
            });
        });

        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };
