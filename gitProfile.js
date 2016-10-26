var Promise = require("bluebird");
var co = require("co");

const name = process.argv[2];
const password = process.argv[3];
const pic = process.argv[4];

console.log(name, password);
console.log = () => {}
const automax = require('./lib/index.js');
co(function*(){
  const users = yield automax.exec(`github login ${name} ${password}`);
  const upload = yield automax.exec(`github changeAvatar /tmp/profiles/${pic}.jpg`)
});

