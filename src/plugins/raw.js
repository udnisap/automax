module.exports = function ({vorpal, driver: {current: browser}}){
  function registerMethod(property){
    vorpal
      .command(`${property} [params...]`, 'Refer http://webdriver.io/api')
      .action(function *({params}){
        const res = yield Promise.resolve(browser[property].apply(this, params))
        if (res.value){
          vorpal.log(res.value);
        }else {
          vorpal.log(res);
        }
      });
  }

  for (var property in browser){
    registerMethod(property);
  }
};
