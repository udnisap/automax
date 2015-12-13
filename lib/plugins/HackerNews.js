
export default function ({vorpal, driver: {current}}){
  return {
    visitGoogle : function (){
      return current
        .url('https://news.ycombinator.com/')
        .getTitle('');
    }
  };
}
