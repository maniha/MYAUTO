require('./homePage.js');
var property = require('../config/property.json');

var loginPage = function(){
    
    //loginPage elements
    var usernameTextbox = function(){
        return element(by.id('UserName'));
    };
    
    var passwordTextbox = function(){
        return element(by.id('Password'));
    };
    
    var loginButton = function(){
        return element(by.buttonText('Logg inn'));
    };
    
    var failedLoginText = function(){
        return element(by.css('.validation-summary-errors>ul>li'));
    };
            
    //loginPage controllers
    this.successLogin = function(username, password){
        usernameTextbox().sendKeys(username);
        passwordTextbox().sendKeys(password);
        loginButton().click();
        //browser.get('http://bedrift.boligmappa.99x.no/')
        browser.ignoreSynchronization = false;
        
        return require('./homePage.js');
    };
    
    this.failedLogin = function(username, password){
        usernameTextbox().sendKeys(username);
        passwordTextbox().sendKeys(password);
        loginButton().click();
        
        return failedLoginText()
    };
    
    this.emptyPasswordLogin = function(username){
        usernameTextbox().sendKeys(username);
        loginButton().click();
        
        return passwordTextbox()
    };
    
    this.emptyUsernameLogin = function(password){
        passwordTextbox().sendKeys(password);
        loginButton().click();
        
        return usernameTextbox()
    };


}
module.exports = new loginPage();