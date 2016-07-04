describe('8.0 Rooms Tab Tests', function () {
    
    //Pages
    var welcomePage = require('../../../pages/welcomePage.js');
    var loginPage, homePage, constructionPage, propetyDetailPage, plantPage, docTab, roomTab;
    
    //Data files   
    var loginData = require('../../../testData/loginData.json');
    var plantData = require('../../../testData/PlantPageData/PropertyTabData/propertyData.json');

    beforeAll(function () {
        loginPage = welcomePage.signinAsHayndverk();
        homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
        constructionPage = homePage.goToplantDetailPage();
        plantPage = constructionPage.goToProperty()
        propetyDetailPage = plantPage.clickBoligRowByAddress(plantData.plantName);
        propetyDetailPage.beforeEach();
        roomTab = propetyDetailPage.goToRoom();
    });
    
    it('All the colums are visible', function () {
        roomTab.isRoomColumsDisplayed().then(function (isCorrect) {
            expect(isCorrect).toBe(true);
        });
    });
    
    it('Room tab Help text visible', function () {
        roomTab.isRoomHelpTextDisplayed(plantData.roomHelpText).then(function (isVisiblet) {
            expect(isVisiblet).toBe(true);
        });
     });
     
     it('Number of Rooms table rows are correct', function () {
         roomTab.isRoomsRowNumberCorrect().then(function (isCorrect) {
             expect(isCorrect).toBe(true);
         });
     });
     
     describe('Room table sorting tests', function () {
         
         beforeAll(function () {
             propetyDetailPage.beforeEach();
             docTab = propetyDetailPage.goToDocument();
         });
         
         it('Check Room table is sorted by Name', function () {
             roomTab.sortByRoomName_A2Z();
             roomTab.isSortedByRoomName_A2Z().then(function (isSorted) {
                 expect(isSorted).toBe(true);
             });
             roomTab.sortByRoomName_A2Z();
             roomTab.isSortedByRoomName_Z2A().then(function (isSorted) {
                 expect(isSorted).toBe(true);
             });
         });
         
         it('Check Room table is sorted by Type', function () {
             roomTab.sortByRoomType_A2Z();
             roomTab.isSortedByRoomType_A2Z().then(function (isSorted) {
                 expect(isSorted).toBe(true);
             });
             roomTab.sortByRoomType_A2Z();
             roomTab.isSortedByRoomType_Z2A().then(function (isSorted) {
                 expect(isSorted).toBe(true);
             });
         });
      });
      
      describe('Rooms table search tests', function () {
          
          beforeAll(function () {
              propetyDetailPage.beforeEach();
              docTab = propetyDetailPage.goToDocument();
          });
          
          it('Check Room table search is working', function () {
              roomTab.searchRoomTable(plantData.roomSearchTxt);
              roomTab.isRoomResultsDisplayed(plantData.roomSearchTxt, plantData.roomSearchTag).then(function (isSearched) {
                  expect(isSearched).toBe(true);
              });
          });
          
          it('Check Room table, no search results displayed', function () {
              roomTab.searchRoomTable(plantData.errorKeyword);
              roomTab.isNoRoomResultsDisplayed().then(function (isSearched) {
                  expect(isSearched).toBe(true);
              });
          });

      });
      
      afterAll(function () {
        homePage.logOut();
    });

});