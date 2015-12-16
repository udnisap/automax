var vorpal = require('./vorpal');
var _ = require('lodash');
var webdriver = require('./webdriver');

class Automax{

  constructor({seleniumOptions, name = 'automax'}){
    this.driver = webdriver(seleniumOptions);
    this.namespaces = [];
    this.vorpal = vorpal;
    this.name = name;
  }

  /**
   * Start the automax session
   */
  start(){
    var banner = `
                               __
    (\\   /)	_____   __ ___/  |_  ____   _____ _____  ___  ___
    .\\\\_//.	\\__  \\ |  |  \\   __\\/  _ \\ /     \\\\__  \\ \\  \\/  /
     )0 0(	 / __ \\|  |  /|  | (  <_> )  Y Y  \\/ __ \\_>    <
    ( (_) )	(____  /____/ |__|  \\____/|__|_|  (____  /__/\\_ \\
     \`'"'\`	     \\/                         \\/     \\/      \\/


Welcome to ${this.name}!
You can automate all your browser related tasks with automax. To starts with run help

    `;
    var vorpal = this.vorpal;
    vorpal.log(banner);
    this.driver.current
      .then(function (){
        this.initialize();
      }.bind(this))
      .catch(function(e){
        vorpal.log('Could not start Automax as it can not connected to Selenium server. Server Resposne ', e);
      });
  }

  initialize(){
    this.vorpal
      .delimiter('>>')
      .show();

    //Exit Selenium session once over
    var window = this.driver.current;
    process.on('beforeExit', function () {
      window.end();
    });
  }

  /**
   * Add a module to Automax
   * @param namespace
   * @param module
   */
  addPlugin(namespace, module){
    if (!_.isString(namespace) || _.isUndefined(module)){
      throw new Error('Arguments do not mactch the method signature');
    }

    if (_.isString(module)){
      module = require(module);
    }

    if (vorpal.find(namespace)){
      throw new Error('Namespace already registered');
    }

    this.mockVorpal(namespace);
    this.vorpal.use(module(this));
    this.unMockVorpal();
  }

  mockVorpal(namespace){
    var vorpal = this.vorpal;
    this.vopalCommand = vorpal.command;
    vorpal.command = _.wrap(vorpal.command, function (func, command, help) {
      return func.call(this, `${namespace} ${command}`, help);
    });
  }

  unMockVorpal() {
    if (_.isFunction(this.vopalCommand)){
      this.vorpal.command = this.vopalCommand;
    }
  }
}


//Singleton instance of Automax
var instance;
module.exports = function(options){
  if (!instance){
    instance = new Automax(options);
  }else {
    instance.vorpal.log('Warning!: Automax is already running. Reusing existing automax session');
  }
  return instance;
};
