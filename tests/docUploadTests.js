describe('Document upload tests', function () {
    
    //Pages
    var welcomePage = require('../pages/welcomePage.js');
    var loginPage, homePage, constructionPage, plantPage, docUploadPage;
    var path = require('path');
    
     //Data files   
    var loginData = require('../testData/loginData.json');
    var plantData = require('../testData/plantData.json');
    var docUploadData = require('../testData/docUploadData.json');

    beforeAll(function () {
        loginPage = welcomePage.signinAsHayndverk();
        homePage = loginPage.successLogin(loginData.username, loginData.correctPw);
        constructionPage = homePage.goToConstructionPage();
        plantPage = constructionPage.clickBoligRowByAddress(plantData.plantName);
        docUploadPage = plantPage.getDocumentUpload();
    });
    
    describe('upload', function(){
        
        it('upload', function(){
            var docPath = path.resolve(__dirname, docUploadData.PDFDoc);
            docUploadPage.uploadSingleDocument(docPath, 'BIM');
        });
        
    });

});