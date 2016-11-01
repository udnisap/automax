const Promise = require('bluebird');

export default function(browser){
 return function async (params, value) {
      const selectors = [
        `*[placeholder*="${params}"]`,
        `#${params}`,
      ];

      return Promise.any(
        selectors.map(selector => browser
                .waitForExist(selector,10000)
                .setValue(selector, value)
                ));
    }
};
