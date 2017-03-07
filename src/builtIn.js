import _ from 'lodash';
import fs from 'fs';
import Promise from 'bluebird';

module.exports = function ({vorpal, driver: {current}}){

  vorpal
    .command('switchWindow', 'Switch to a window')
    .action(function *(){
      const {value: windows} = yield current.windowHandles();
      console.log(windows)
      const windowWithUrl = yield Promise.mapSeries(windows, (id => 
        current
        // .window(`{${id}}`) && 
        .window(id) 
        .then(data => 
          current
            .url()
            .then(({value: url}) => console.log(id, url) || ({id, url}))

        ))
      );
      windowWithUrl.forEach(({id, url}, i) => vorpal.log(`[${i}] ${id} => ${url}`));
      return this.prompt({
        type: 'input',
        name: 'window',
        deafult: 0,
        message: 'Select the browser window to switch to?'
      }, (index) => {
        const {id: selectedWindowId} =_.get(windowWithUrl, `[${index}]`, 0);
        console.log(selectedWindowId)
        current.window(selectedWindowId);
      })
      return Promise.resolve();
    });

  vorpal
    .command('switchSession', 'Switch to a session')
    .action(function *(){
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

  vorpal
    .command('syncCookies [file]', 'Sync Browser cookies with the file')
    .action(function *({file = '/tmp/cookies.json'} = {}){
      let currentCookies = yield current.cookie();
      currentCookies = currentCookies.value;
      try {
        const savedCookies = require(file);
        // console.log('file' , fileContent);
        // const savedCookies = JSON.parse(fileContent);
        currentCookies = _.unionBy(savedCookies, currentCookies, JSON.stringify);
        console.log('cookies are merged');
      } catch (e){
        console.log('cookies in the file are discared');
      }
      fs.writeFileSync(file, JSON.stringify(currentCookies) + '\n');
      current.cookie('post', currentCookies);
    })
};
