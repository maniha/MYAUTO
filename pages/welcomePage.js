require('../pages/loginPage.js');

var property = require('../config/property.json');

var welcomePage = function(){
    
    //welcomePage elements
    var loginButton = function(){
        return element(by.linkText('Logg inn'));
    };
    
    var loginAsHayndverk = function(){
        return element.all(by.css('.bed-login-options-menu.active>li')).get(0);
    };    
    
    //welcomePage controllers
    var getWelcomePage = function(){
        browser.driver.manage().window().maximize();
        browser.driver.get(property.baseURL);
    };
    
    this.signinAsHayndverk = function(){
        browser.ignoreSynchronization = true;
        getWelcomePage();
        browser.driver.sleep(4000);
        loginButton().click();
        browser.driver.sleep(1000);
        loginAsHayndverk().click();    
        browser.driver.sleep(4000);
        
        return require('./loginPage.js');
    };
    
}
module.exports = new welcomePage();