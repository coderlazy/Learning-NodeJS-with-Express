var fortune = require('../lib/fortune.js');
var weather = require('../lib/weather.js');

var expect = require('chai').expect;

suite('Fortune cookie tests', function () {
    test('getFortune() should return a fortune', function () {
        expect(typeof fortune.getFortune() === 'string');
    });
});

suite('Weather data tests', function () {
    test('getWeather() should return an object has property locations', function () {
        var returnData = weather.getWeatherData();
        expect(typeof returnData === 'object');
        expect(returnData).to.have.property('locations');
    });

    test('locations should be an array of weather data', function () {
        var returnData = weather.getWeatherData().locations;
        expect(returnData).to.be.instanceof(Array);
        expect(returnData).to.have.length.above(1);
        expect(returnData).to.have.deep.property('[0].name');
        expect(returnData).to.have.deep.property('[0].forecastUrl');
        expect(returnData).to.have.deep.property('[0].iconUrl');
        expect(returnData).to.have.deep.property('[0].weather');
        expect(returnData).to.have.deep.property('[0].temp');
    });
});
