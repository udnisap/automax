/**
 * Created by pasinduperera on 11/25/15.
 */
var repl = require('repl');
var Q = require("q");


module.exports = function(replServer) {

    replServer = replServer || repl.start({});


    var _eval = replServer.eval;
    //promise evaluvation
    //TODO : use https://github.com/tlrobinson/node-repl-promised
    replServer.eval = function refinedEval(cmd, context, filename, callback) {
        var that = this;
        if (cmd[cmd.length-1] === '\n'){
            //Command to be executed
            return Q.nfcall(_eval, cmd, context, filename)
                .then(function(result){
                    // if function call it with no parameters
                    if (typeof result === 'function'){
                        return Q.nfcall(_eval, cmd+'()', context, filename);
                    }
                })
                .then(function() {
                        //Success callback
                        Array.prototype.unshift.call(arguments, false);
                        callback.apply(that, arguments);
                    }, function() {
                        callback.apply(that, arguments);
                    });
        }else{
            //Suggession
            return Q.nfapply(_eval, arguments);
        }
    };

    return replServer;
};