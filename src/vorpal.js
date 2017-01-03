var vorpal = require('vorpal')();
var coVorpal = require('co-vorpal');
var fs = require('fs');

coVorpal(vorpal);

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


vorpal
   .command('execute <namespace> <task>', 'Execute prewritten script')
   .action(function *({ namespace, task }){
     try{
       const commands = fs.readFileSync(task).toString().trim().split('\n');
       for(let i = 0; i < commands.length; i++){
         console.log(commands[i]);
         yield vorpal.execSync(`${namespace} ${commands[i]}`);
       }
       return Promise.resolve();
     }catch(e){
       console.log(e);
     }
   });

module.exports = vorpal;


