var Browser = require('zombie'),
        assert = require('chai').assert;

var browser;

var port = process.env.PORT || 3000;

var ip = process.env.IP || 'localhost';

suite('Cross-Page Tests', function () {
    setup(function () {
        browser = new Browser();
    });

    test('requesting a group rate quote from the hood river tour page' +
            'should populate the referrer field', function (done) {
                var referrer = 'http://' + ip + ':' + port + '/tours/hood-river';

                browser.visit(referrer, function () {
                    browser.clickLink('.requestGroupRate', function () {
                        assert(
                                browser.field('referrer').value === referrer);
                        done();
                    });
                });
            });

    // test('requesting a group rate from the oregon coast tour page should ' +
    //         'populate the referrer field', function (done) {
    //             var referrer = 'http://' + ip + ':' + port + '/tours/oregon-coast';

    //             browser.visit(referrer, function () {
    //                 browser.clickLink('.requestGroupRate', function () {
    //                     assert(
    //                             browser.field('referrer').value === referrer);
    //                     done();
    //                 });
    //             });
    //         });

    test('visiting the "request group rate" page dirctly should result ' +
            'in an empty referrer field', function (done) {
                browser.visit('http://' + ip + ':' + port + '/tours/request-group-rate',
                        function () {
                            assert(browser.field('referrer').value === '');
                            done();
                        });
            });
});