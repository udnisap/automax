var repl = require('repl');
var Q = require('q');
var parser = require('./easyParse');


module.exports = function(replServer) {

  replServer = replServer || repl.start({});


  var oEval = replServer.eval;
  //promise evaluvation
  //TODO : use https://github.com/tlrobinson/node-repl-promised
  replServer.eval = function refinedEval(cmd, context, filename, callback) {
    var that = this;
    if (cmd[cmd.length - 1] === '\n'){


      try {
        cmd = parser(cmd);
      }catch (e){
        callback.call(this, [e]);
        return;
      }
      console.log('command executing ', cmd);

      //Command to be executed
      Q.nfcall(oEval, cmd, context, filename)
        .then(function (result){
          // if function call it with no parameters
          if (typeof result === 'function'){
            return Q.nfcall(oEval, cmd+'()', context, filename);
          }else {
            return result;
          }
        })
        .then(function () {
          //Success callback
          Array.prototype.unshift.call(arguments, false);
          callback.apply(that, arguments);
        }, function () {
          callback.apply(that, arguments);
        });
    }else {
      //Suggession
      return Q.nfapply(oEval, arguments);
    }
  };

  return replServer;
};
