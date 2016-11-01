var _ = require('lodash');
var Promise = require('bluebird');
var defaultOptions = {
  desiredCapabilities: {
    browserName: 'chrome'
  },
  // host: '10.10.10.107',
  // port: '4444'
};

const htmlElms = ['span', 'div', 'input'];
const selectors = (text) => [
  `#${text}`,
  `*[value="${text}"]`,
  `*[name="${text}"]`,
  ... htmlElms.map(elm => `${elm}=${text}`),
];

export default function (options){
  const opts = Object.assign({}, defaultOptions, options)
  var browser = require('webdriverio')
    .remote(opts)

  browser
    .sessions()
    .then(({value:sessions}) => {
      console.log('Avalialble sessions: ');
      sessions.map(s => console.log(s.id));
      if (_.isEmpty(sessions)) {
        console.log('Initializing new session');
        browser.init();
      } else {
        const currentSession = _.last(sessions).id;
        console.log(`Connecting to ${currentSession}`)
        browser.sessionID(currentSession);
      }
    })

  browser.addCommand('sessionID', function(sessionID){
    if (sessionID) {
      return this.requestHandler.sessionID = sessionID;
    } else {
      return this.requestHandler.sessionID;
    }
  })

  browser
    .addCommand('selector', function (text){
      if (!text) throw Error('Enter a text to be used as selector');
      return Promise.any(
        selectors(text)
          .map(selector => browser
            .waitForExist(selector,10000)
            .then(() => selector)
          )
      );
    });


  browser
    .addCommand('tap', (text) => browser
      .selector(text)
      .then(selector => browser.click(selector))
    );

  browser
    .addCommand('put', (text, value) => browser
      .selector(text)
      .then(selector => browser.setValue(selector, value))
    );

  return {
    current: browser,
    switchTo: (tabIndex) => browser.getTabIds().then((tabIds) => browser.switchTab(tabIds[tabIndex])),
    new: browser.newWindow,
  };
}

