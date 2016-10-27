var _ = require('lodash');
var Promise = require('bluebird');
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

  browser
    .addCommand('tap', function async (params) {
      const selectors = [
        `*[value="${params}"]`,
        `span=${params}`,
        `div=${params}`,
        `#${params}`,
      ];

      return Promise.any(
        selectors.map(selector => browser
                .waitForExist(selector,10000)
                .click(selector)
                ));
    });

  browser
    .addCommand('put', function async (params, value) {
      const selectors = [
        `*[placeholder*="${params}"]`,
        `#${params}`,
      ];

      return Promise.any(
        selectors.map(selector => browser
                .waitForExist(selector,10000)
                .setValue(selector, value)
                ));
    });

  return {
    current: browser,
    switchTo: (tabIndex) => browser.getTabIds().then((tabIds) => browser.switchTab(tabIds[tabIndex])),
    new: browser.newWindow,
  };
}

