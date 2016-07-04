var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var property = require('../config/property.json');
var pathHelper = require('../helper/pathHelper.js');

exports.config = {
    //directConnect: true,
    seleniumArgs: ['-Dwebdriver.ie.driver=../node_modules/protractor/selenium/IEDriverServer.exe'],

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        //'browserName': 'firefox'
        'browserName': 'chrome',
        'chromeOptions': {
            'args': [
                'incognito',
                'disable-extensions',
                'start-maximized',
                'enable-crash-reporter-for-testing'
            ]
        },
        prefs: {
            download: {
                'prompt_for_download': false,
                'directory_upgrade': true,
                'default_directory': property.downloadPath,
            },

        },
    },

    /*multiCapabilities: [{
          'browserName': 'internet explorer',
          'platform': 'ANY',
          'version': '11'
          }],*/

    allScriptsTimeout: 45000,

    // Framework to use. Jasmine 2 is recommended.
    framework: 'jasmine2',
    //restartBrowserBetweenTests: true,

    specs: [//'../tests/login_test.js',
          '../tests/homepage_test.js',
    //      '../tests/PlantTests/plantDetailPage_tests.js',
    //      '../tests/PlantTests/buildingTabPage_tests.js',
    //      '../tests/PlantTests/propertyTabPage_tests.js',
    //      '../tests/PlantTests/BuildingTests/buildingDetailPage_tests.js',
    //      '../tests/PlantTests/BuildingTests/buildingDocTab_tests.js',
    //      '../tests/PlantTests/BuildingTests/buildingProjTab_tests.js',
    //      '../tests/PlantTests/PropertyTests/propertyTabPage_tests.js',
    //      '../tests/PlantTests/PropertyTests/propertyDocTab_tests.js',
    //      '../tests/PlantTests/PropertyTests/propertyRoomTab_tests.js',
    //      '../tests/PlantTests/PropertyTests/propertyProjectTab_tests.js',
    //      '../tests/PlantTests/PropertyTests/propertyDeviceTab_tests.js',
          //'../tests/PlantTests/addPlant_tests.js'
          //'../tests/ProjectTests/projectPage_test.js',
          //'../tests/ProjectTests/projDocument_test.js',
          //'../tests/ProjectTests/projApartmentTag_test.js',
          //'../tests/ProjectTests/projRoom_test.js',
          //'../tests/ProjectTests/projCompany_test.js',
          //'../tests/ProjectTests/projDevice_test.js',
          //'../tests/ProjectTests/projectDetailpage_test.js',
          //'../tests/ProjectTests/projAdd_Test.js',
          //'../tests/ProjectTests/projConnectToPlant_Test.js',
          //'../tests/ProjectTests/projAddContent_Test.js',
          //'../tests/ProjectTests/projDocUpload_Test.js',
          //'../tests/ProjectTests/projAddCompany_Test.js'
    ],

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 80000
    },

    onPrepare: function() {

        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: property.Jasmine2HtmlReportPath,
                filePrefix: 'index'
            })
        );

        by.addLocator("ngClick", function(value, parentElement) {
            parentElement = parentElement || document;
            var nodes = parentElement.querySelectorAll("[ng-click]");
            return Array.prototype.filter.call(nodes, function(node) {
                return (node.getAttribute("ng-click") === value);
            });
        });

    },

};