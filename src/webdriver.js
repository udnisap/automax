
var defaultOptions = {
  desiredCapabilities: {
    browserName: 'chrome'
  }
};


export default function (options){
  const opts = Object.assign({}, defaultOptions, options)
  var browser = require('webdriverio')
    .remote(opts)
    .init();

  return {
    current: browser,
    switchTo: (tabIndex) => browser.getTabIds().then((tabIds) => browser.switchTab(tabIds[tabIndex])),
    new: browser.newWindow
  };
}

