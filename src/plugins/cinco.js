var _ = require('lodash');
module.exports = function({ vorpal, driver: { current, state }}){
  vorpal
    .command('start', 'Check for state')
    .action(() => current
      .url('http://localhost:8888'));

  vorpal
    .command('actions', 'Get the console actions')
    .action(() => current
      .log('browser')
      .then(logs => {
        return _(logs.value)
          .filter(log => log.level === 'INFO'
            && log.message.includes('action') 
            && !log.message.includes('router'))
          .map(log => log.message
            .split('@')[1]
            .replace(/ /g,''))
          .value();
        }));

  vorpal
    .command('select <user>', 'Select user from user list')
    .action(({user}) => current
      .click(`span*=${user}`)
    );

  vorpal
    .command('login <password>', 'Login to the pos')
    .action(({ password }) => current
    .setValue('#ctaf_login_password', password)
    .click('//*[@id="ctaf_login_submit"]')); 
  
  vorpal
    .command('getState <state>', 'get state value')
    .action(({ state }) => current
    .execute(`return store(['${state}'])`)
    .then(({ value }) => value));


  vorpal
    .command('tap <value> [id]', 'click on element based on text')
    .action(({ value, id = 0 }) => current
    .tap(value, id)
    .then((res) => {
      if(!res){
        throw Error('Element not found');
      } else {
        return true;
      }
    }));


  vorpal
    .command('put <param> <value>', 'click on element based on text')
    .action(({ param, value }) => current
    .put(param, value)
    .then((res) => {
      if(!res){
        throw Error('Element not found');
      } else {
        return true;
      }
    }));



}
