var fortune = require('./lib/fortune.js');

var weather = require('./lib/weather.js');

var express = require('express');

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars')
    .create({
        defaultLayout: 'main',
        // section helper
        helpers: {
            section: function(name, options) {
                if (!this._sections) this._sections = {};
                this._sections[name] = options.fn(this);
                return null;
            }
        }
    });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// setup IP and Port for generalization
app.set('port', process.env.PORT || 3000);
app.set('ip', process.env.IP || 'localhost');

// declare public folder
app.use(express.static(__dirname + '/public'));

// middleware to detect if test enabled
app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1';
    next();
});

// middleware to get weather data
app.use(function(req, res, next) {
    if (!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weatherData = weather.getWeatherData();
    next();
});

// set routes
app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/tours/hood-river', function(req, res) {
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res) {
    res.render('tours/request-group-rate');
});

app.get('/jquerytest', function(req, res) {
    res.render('jquerytest');
});

app.get('/tours/payment', function(req, res) {
    res.render('tours/payment', {
        currency: {
            name: 'United States dollars',
            abbrev: 'USD',
        },
        tours: [{
            name: 'Hood River',
            price: '$99.95'
        }, {
            name: 'Oregon Coast',
            price: '$159.95'
        }, ],
        specialsUrl: '/january-specials',
        currencies: ['USD', 'GBP', 'BTC'],
    });
});

// custom 404 page
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});
