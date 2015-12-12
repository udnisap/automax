var replServer = require('./repl')();
var _ = require('lodash');
var {driver, switchTo} = require('./webdriver');
var script = require('./checkHackerNews');
var like4org = require('./like4like.org');

//replServer.context = {};
replServer.context.window = driver;
replServer.context.switchTo = switchTo;
replServer.context.HackerNews = script(driver);
replServer.context.like4org = like4org(driver);
replServer.context.log = () => console.log(arguments);

replServer.on('exit', function () {
  driver.end();
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
