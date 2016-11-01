const Promise = require('bluebird');

export default function(browser){
  return function async (params) {
    const selectors = [
      `*[value="${params}"]`,
      `span=${params}`,
      `div=${params}`,
      `#${params}`,
      `button=${params}`
    ];

    return Promise.any(
      selectors.map(selector => browser
              .waitForExist(selector,10000)
              .click(selector)
              ));
  };
};
