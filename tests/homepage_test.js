describe('2.0 Homepage tests', function(){
    
    //Pages
    var welcomePage = require('../pages/welcomePage.js');
    var loginPage, homePage;
    
    //Data files   
    var loginData = require('../testData/loginData.json');
    
	beforeAll(function(){
		loginPage = welcomePage.signinAsHayndverk();
        homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
	});
    
    describe('Homepage functional tests', function(){
        
        it('Menu button test', function(){
            //homePage.isMenuButtonDisplayed().then(function(dispalyed1){
            //    expect(dispalyed1).toBeTruthy();
            //    homePage.clickMenuButton();
            //    homePage.isMenuDisplayed().then(function(dispalyed2){
            //        expect(dispalyed2).toBeFalsy();
            //        homePage.clickMenuButton();
            //        homePage.isMenuDisplayed().then(function(dispalyed3){
            //            expect(dispalyed3).toBeTruthy();
            //        });
            //    });
            //});
        });

        //it("plant list displayed"), function () {
        //    homePage.plantListDD(function (isdisplayed) {
        //        expect(isdisplayed).toBeTruthy();
        //    });
        //};


        it('home page plant correct searcht est', function () {
            
            homePage.isSearch().then(function (plant) {
                expect(plant).toBeTruthy();
             });

        });

        it('home page plant detail table', function () {

            homePage.isPlantModalDisplayed().then(function(visi){
                expect(visi).toBeTruthy();
            });
        });



        //it('Validatibg the plant modal', function () {
        //    homePage.displayModaldata();
        //});

         
  });
               
 
         

    
    afterAll(function(){
        homePage.logOut();
    });
    
    
});