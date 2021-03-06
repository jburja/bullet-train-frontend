const email = 'nightwatch@solidstategroup.com';
const password = 'nightwatch';
const url = `http://localhost:${process.env.PORT || 8080}/signup`;

const fillOutForm = browser => browser
    .url(url) // visit the url
    .waitForElementVisible('[name="firstName"]') // wait for the sign up fields to show
    .setValue('[name="firstName"]', 'Night')
    .setValue('[name="lastName"]', 'Watch')
    .setValue('[name="companyName"]', 'Nightwatch Ltd')
    .setValue('[name="email"]', email)
    .setValue('[name="password"]', password);

module.exports = {
    'Registration should fail with already used email address': function (browser) {
        fillOutForm(browser)
            .click('button[name="signup-btn"]');

        browser.expect.element('#error-alert').to.be.visible;
        browser.expect.element('#email-error').to.be.visible;
    },
    'Registration should fail with invalid email address': function (browser) {
        fillOutForm(browser)
            .clearValue('[name="email"]')
            .setValue('[name="email"]', 'crap-email')
            .click('button[name="signup-btn"]');

        browser.expect.element('#error-alert').to.be.visible;
        browser.expect.element('#email-error').to.be.visible;
    },
    'Registration should fail with password too short error': function (browser) {
        fillOutForm(browser)
            .clearValue('[name="password"]')
            .setValue('[name="password"]', 'abc123')
            .click('button[name="signup-btn"]');

        browser.expect.element('#error-alert').to.be.visible;
        browser.expect.element('#password-error').to.be.visible;
    },
    'Registration should fail with password entirely numeric error': function (browser) {
        fillOutForm(browser)
            .clearValue('[name="password"]')
            .setValue('[name="password"]', '12345678')
            .click('button[name="signup-btn"]');

        browser.expect.element('#error-alert').to.be.visible;
        browser.expect.element('#password-error').to.be.visible;
    },
    'Registration should fail with password too common error': function (browser) {
        fillOutForm(browser)
            .clearValue('[name="password"]')
            .setValue('[name="password"]', 'abcd1234')
            .click('button[name="signup-btn"]');

        browser.expect.element('#error-alert').to.be.visible;
        browser.expect.element('#password-error').to.be.visible;
        browser.end();
    },
};
