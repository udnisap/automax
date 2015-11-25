
module.exports = function(browser){
    return {
        visitGoogle : function(){
            return browser
                .url('http://www.google.com')
                .getTitle();
        }
    }

};