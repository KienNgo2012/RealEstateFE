// e2e/sample.e2e-spec.js
describe('Sample E2E Test', function () {
    it('should navigate to the homepage and verify the title', function () {
      browser.get('http://localhost:4200/reactive-form');
      expect(browser.getTitle()).toEqual('MyApp');
    });
  });
  