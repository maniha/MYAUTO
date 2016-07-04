/// <reference path="../typings/tsd.d.ts" />

describe('1.0 Login page tests:', function(){
    
    //Pages
    var welcomePage = require('../pages/welcomePage.js');
    var loginPage;
    
    //Data files   
    var loginData = require('../testData/loginData.json');
    
	beforeEach(function(){
		loginPage = welcomePage.signinAsHayndverk();
	});
    
    describe('Successful login test', function(){
        it('Successful login test', function(){            
            var homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
            homePage.isUserLoggedIn().getText().then(function(uName){
                expect(uName).toBe(loginData.accountName);
            });
            homePage.logOut();
        });
    });
    
    describe('Failed loging tests', function(){
        
        it('Incorrect username test', function(){
            loginPage.failedLogin(loginData.username, loginData.incorrectPw).getText().then(function(failedLoginText){
                expect(failedLoginText).toBe(loginData.failedLogin);
            });            
        });
        
        it('Empty username field test', function(){
            loginPage.emptyPasswordLogin(loginData.username).getAttribute('class').then(function(passwordTextboxClass){
                expect(passwordTextboxClass).toBe(loginData.incompleteLogin);
            });            
        });
        
        it('Empty password field test', function(){
            loginPage.emptyUsernameLogin(loginData.correctPw).getAttribute('class').then(function(usernameTextboxClass){
                expect(usernameTextboxClass).toBe(loginData.incompleteLogin);
            });            
        });
        
    });
    
});