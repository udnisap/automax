import _ from 'lodash';
module.exports = function ({vorpal, driver: {current: browser}}){
  function registerMethod(property){
    vorpal
      .command(`${property} [params...]`, 'Refer http://webdriver.io/api')
      .action(function *({params}){
        const cleanedParams = params.map(i => i.replace ? i.replace('\\','') : i)
        const res = yield Promise.resolve(browser[property].apply(this, cleanedParams))
        if (res.value){
          vorpal.log(res.value);
        }else {
          vorpal.log(res);
        }
      });
  }

  const methods = _.keysIn(browser);

  methods.forEach(property => {
    registerMethod(property);
  })
};
