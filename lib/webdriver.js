'useStrict';

var options = {
  desiredCapabilities: {
    browserName: 'chrome'
  }
};

var driver = require('webdriverio')
  .remote(options)
  .init();


export default {
  driver: driver,
  switchTo: (tabIndex) => driver.getTabIds().then((tabIds) => driver.switchTab(tabIds[tabIndex]))
}
