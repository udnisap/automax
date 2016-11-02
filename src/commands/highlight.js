const Promise = require('bluebird');

export default function(browser){
 return function async(params) {
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
    }
};
