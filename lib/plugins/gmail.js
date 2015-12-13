module.exports = function ({vorpal, driver: {current}}){

  vorpal
    .command('login <username> <password>', 'Login into Gmail with given credential')
    .action(function ({username, password}){
      this.log(username, password);
      return current
        .url('http://gmail.com');
    });
};
