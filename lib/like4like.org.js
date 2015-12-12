/**
 * Created by pasinduperera on 11/30/15.
 */
export default function (browser){
  return {
    login: function (username, password){
      var username = 'kamal123456';
      var password = 'asdfgh';
      return browser
        .url('http://www.like4like.org/user/login.php')
        .setValue('input[name="username"]', username)
        .setValue('input[name="password"]', password)
        .click('input[name="submit"]');
    },
    earnYoutube: function (){
      browser.url('http://www.like4like.org/user/earn-youtube-video.php');
    }
  };
}
