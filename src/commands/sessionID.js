export default function(browser){
  return function(sessionID) {
    if (sessionID) {
      return this.requestHandler.sessionID = sessionID;
    } else {
      return this.requestHandler.sessionID;
    }
  }
};
