import _ from 'lodash';
module.exports = function ({vorpal, driver: {current}}){

  vorpal
    .command('switchTo', 'Switch to a session')
    .action(function *({username, password}){
      const {value: sessions} = yield current.sessions();
      const sessionsWithUrls = yield Promise.all(sessions.map(({id}) => 
            current
              .sessionID(id)
              .url()
              .then(({value: url}) => ({id, url}))
          ));
      sessionsWithUrls.forEach(({id, url}, i) => vorpal.log(`[${i}] ${id} => ${url}`));
      return this.prompt({
        type: 'input',
        name: 'session',
        deafult: 0,
        message: 'Select the browser session to switch to?'
      }, (sessionId) => {
        current.sessionID(_.get(sessionsWithUrls, `[${sessionId}]`, 0))
      })
      return Promise.resolve();
    });
};
