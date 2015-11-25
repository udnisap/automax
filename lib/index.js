var replServer = require('./repl')();
var _ = require('lodash');
var browser = require('./webdriver');
var script = require('./checkHackerNews');

replServer.context.browser = browser;
replServer.context.google = script(browser);

replServer.on('exit', function () {
    browser.end();
    console.log('Th-thank you, Master.');
});

//replServer.eval = _.wrap(replServer.eval, function(eval, cmd, context, filename, callback) {
//    console.warn('eval with:', arguments);
//    arguments[4] = _.wrap(callback, function(resultCallback){
//        console.warn('result callbackdata:', arguments);
//        resultCallback.apply(this, Array.prototype.slice.call(arguments, 1));
//    });
//    eval.apply(this, Array.prototype.slice.call(arguments, 1));
//});
