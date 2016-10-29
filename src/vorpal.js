var vorpal = require('vorpal')();

//Remove default exit
const exit = vorpal.find('exit');
if (exit) {
  exit.remove();
}

vorpal
  .history('automax')
  .command('exit', 'Quit automax')
  .alias('quit')
  .action(function (){
    process.exit(0);
  });

module.exports = vorpal;


