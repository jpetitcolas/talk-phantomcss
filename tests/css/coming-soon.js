phantom.casperPath = './CasperJs';
phantom.injectJs(phantom.casperPath + '/bin/bootstrap.js');

var casper = require('casper').create({
    viewportSize: {
        width: 800,
        height: 600
    }
});

var phantomcss = require('./phantomcss.js');
var url = 'http://phantomcss/index.html';

phantomcss.init({
    screenshotRoot: './screenshots',
    failedComparisonsRoot: './failures'
});

casper
    .start(url)
    .then(function() {
        phantomcss.screenshot('.coming_soon', 'coming-soon-page');
    })
    .then(function() {
        phantomcss.compareAll();
    })
    .run(function() {
        phantom.exit(phantomcss.getExitStatus());
    });
