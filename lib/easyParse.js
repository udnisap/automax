module.exports = function (userCommand){
  var [command, params] = getMatches (userCommand, /\s*([^\s]*)\s+(.*)*$/);
  var args = getMatches(params, /(\w+)/g) || [];
  args = args.map(function(arg){
    return `"${arg}"`;
  });
  return `${command}(${args.join(', ')})\n`;

  function getMatches(str, re){
    var m;
    if ((m = re.exec(str)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      return m;
    }else {
      throw new Error(`Invalid Expression :  ${userCommand}`);
    }
  }

};
