
export default function (browser){
  return {
    visitGoogle : function (){
      return browser
        .url('https://news.ycombinator.com/')
        .getTitle('');
    }
  };
}
