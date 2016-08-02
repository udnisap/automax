
var defaultOptions = {
  desiredCapabilities: {
    browserName: 'chrome'
  }
};


export default function (options = defaultOptions){
  var browser = require('webdriverio')
    .remote(options)
    .init();

  return {
    current: browser,
    switchTo: (tabIndex) => browser.getTabIds().then((tabIds) => browser.switchTab(tabIds[tabIndex])),
    new: browser.newWindow
  };
}

