module.exports = function ({vorpal, driver: {current:browser}}){
  vorpal
    .command('title','Get the title of the window')
    .action(function (){
      var that = this;
      return browser.getTitle().then(function (res){
        that.log(res);
      });
    });

  vorpal
    .command('typein <keys>', 'Type in keys to the current focus element')
    .action(function (args){
      var that = this;
      return browser.keys(args.keys).then(function (res){
        that.log(res);
      });
    });

  vorpal
    .command('fillin <element> <text>', 'Fill selected item with give text')
    .action(function (args){
      var that = this;
      return browser.setValue(args.element, args.text).then(function (res){
        that.log(res);
      });
    });

  vorpal
    .command('click <element>', 'Click on an element with given selector (In either XPATH or CSS)')
    .action(function (args){
      var that = this;
      return browser.click(args.element).then(function (res){
        that.log(res);
      });
    });

  vorpal
    .command('url [url]', 'Get the Current Location of the browser')
    .action(function (args){
      var that = this;
      if (args.url){
        //Setter
        return browser.url(args.url).then(function (res){
          that.log(res);
        });
      }else {
        //Getter
        return browser.getUrl().then(function (res){
          that.log(res);
        });
      }
    });

};
