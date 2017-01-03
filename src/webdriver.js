var _ = require('lodash');
var Promise = require('bluebird');
var defaultOptions = {
  // desiredCapabilities: {
  //   browserName: 'chrome',
  //   platformName: 'Android'
  // },
  // host: '0.0.0.0',
  // port: '4444'
};

const htmlElms = ['span', 'div', 'input', 'li'];
const selectors = (text) => [
  `#${text}`,
  `*[value="${text}"]`,
  `*[name="${text}"]`,
  `*[placeholder="${text}"]`,
  ... htmlElms.map(elm => `${elm}=${text}`),
];

export default function (options){
  const opts = Object.assign({}, defaultOptions, options)
  var browser = require('webdriverio')
    .remote(opts)
    // .init();


  browser.addCommand('sessionID', function(sessionID){
    if (sessionID) {
      this.requestHandler.sessionID = sessionID;
    } else {
      this.requestHandler.sessionID;
    }
    return browser;
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

