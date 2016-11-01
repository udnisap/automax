var Promise = require('bluebird');
import tap from './commands/tap';
import put from './commands/put';
import highlight from './commands/highlight';
import sessionID from './commands/sessionID';

var defaultOptions = {
  desiredCapabilities: {
    browserName: 'chrome',

  'webdriver': { remote: { sessionid:'6a52180a-0059-48df-944c-616be3223410'}
 }  },
  //host:'10.10.10.107',
  //port:'4444'
};
export default function (options){
  const opts = Object.assign({}, defaultOptions, options)
  var browser = require('webdriverio')
    .remote(opts)
    .init();
  browser
    .addCommand('sessionID', sessionID(browser));
  browser
    .addCommand('tap', tap(browser));
  browser
    .addCommand('put', put(browser));
  browser
    .addCommand('highlight', highlight(browser));
  return {
    current: browser,
    switchTo: (tabIndex) => browser.getTabIds().then((tabIds) => browser.switchTab(tabIds[tabIndex])),
    new: browser.newWindow,
  };
}

