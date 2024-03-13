// protractor.conf.js
exports.config = {
    framework: 'jasmine', // You can use Jasmine or Mocha
    seleniumAddress: 'http://localhost:4444/wd/hub', // Use the address where your WebDriver is running
  
    // Capabilities define which browser(s) to use for testing
    capabilities: {
      browserName: 'firefox', // You can use 'firefox', 'safari', etc.
    },
  
    // Specify the test files
    specs: ['e2e/**/*.e2e-spec.js'],
  
    // Jasmine options
    jasmineNodeOpts: {
      showColors: true,
      defaultTimeoutInterval: 30000, // Adjust this as needed
    },
  };
  