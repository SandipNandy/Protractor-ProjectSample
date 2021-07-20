exports.config = {
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    //directConnect: true,
     //Capabilities to be passed to the webdriver instance.
    
    //Multicapabilities: {
      //'browserName': 'firefox'
      //'browserName': 'chrome',
     //'shardTestFiles': true,
     // 'maxInstances': 2,
      /*chromeOptions:{
        args:["--headless"]
      },*/
      
    //},
    
     onPrepare: function() {
      // Override the timeout for webdriver.
      //browser.executeScript('window.open()');
      browser.driver.manage().timeouts().implicitlyWait(250000);
    },
    multiCapabilities: [
      {
        //'browserName': 'firefox'
        "browserName": "chrome",
        "chromeOptions": {
          'binary': "C:\\Program Files\\Google\\Chrome1\\Application\\chrome.exe",  
      },
        logName:"Recon Core :- ",
        seleniumAddress: 'http://9.79.208.143:4444/wd/hub',
        specs: ['./PA_ReconCreation_Main.js'],
      },
    
    ],
    jasmineNodeOpts: {
      defaultTimeoutInterval: 2000000
    },
    onPrepare: function () {
      // jasmine.getEnv().addReporter(reporter);
       var AllureReporter = require('C:/Users/SandipNandi/AppData/Roaming/npm/node_modules/jasmine-allure-reporter');
       jasmine.getEnv().addReporter(new AllureReporter({
         resultsDir: 'allure-resultsReconCoreAvnet'
       }));
       jasmine.getEnv().afterEach(function(done){
         browser.takeScreenshot().then(function (png) {
           allure.createAttachment('Screenshot', function () {
             return new Buffer(png, 'base64')
           }, 'image/png')();
           done();
         })
       });
    }
    
  };