import _ from 'lodash';

function registerMethod(vorpal, browser, property) {
  vorpal
    .command(`${property} [params...]`, 'Refer http://webdriver.io/api')
    .parse(cmd => cmd
      .split(' ')
      .map(encodeURIComponent)
      .join(' '))
    .action(async ({ params = [] }) => {
      const cleanedParams = params.map(decodeURIComponent);
      const res = await browser[property](...cleanedParams);
      if (res.value) {
        vorpal.log(res.value);
      } else {
        vorpal.log(res);
      }
    });
}

module.exports = ({ vorpal, driver: { current: browser } }) => {
  const methods = _.keysIn(browser);

  methods.forEach((property) => {
    registerMethod(vorpal, browser, property);
  });
};
