/**
 * Created by pasinduperera on 11/26/15.
 */

var driver = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

module.exports = driver
    .remote(options)
    .init();