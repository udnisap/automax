var Promise = require('bluebird');

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

  browser.addCommand('sessionID', function(sessionID){
    if (sessionID) {
      return this.requestHandler.sessionID = sessionID;
    } else {
      return this.requestHandler.sessionID;
    }
  })


  browser
    .addCommand('tap', function async (params) {
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

  browser
    .addCommand('highlight', function async(params) {
      const selectors = [
        `*[value="${params}"]`,
        `span=${params}`,
        `div=${params}`,
        `#${params}`,
        `button=${params}`
      ];

      return Promise.any(
        selectors.map(selector => browser
        .waitForExist(selector,1000)
        .elements(selector)
        .then(res => {
          return Promise.all(
              res.value.map(arg => browser
                .elementIdLocation(arg.ELEMENT)
                .then(loc => {
                  return browser.execute(`var label = document.createElement("label");
                    label.innerText = "${arg.ELEMENT}";
                    var main = document.getElementById("app");
                    label.style.position="absolute";
                    label.style.top="${loc.value.y}px";
                    label.style.left="${loc.value.x}px";
                    label.style.color="red";
                    label.style.width="15px";
                    label.style.height="15px";
                    label.style['text-align']="center";
                    label.style['background-color']='black';
                    label.style['z-index']='100';
                    main.appendChild(label);
                  `)
                }))
          )
        })
      ));
    });

  return {
    current: browser,
    switchTo: (tabIndex) => browser.getTabIds().then((tabIds) => browser.switchTab(tabIds[tabIndex])),
    new: browser.newWindow,
  };
}

