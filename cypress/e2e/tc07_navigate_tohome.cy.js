// cypress/e2e/TC07_Navigate_Profile_to_HomeOrReports.cy.js
/// <reference types="cypress" />

describe('TC07 – Navigate Profile → Home or Reports', () => {
  it('User clicks Back on Profile and returns to previous page (/home or /user/reports) without errors', () => {
    // Generate temporary user
    const ts = Date.now();
    const testEmail = `tempuser_${ts}@example.com`;
    const testPassword = 'Test@1234';
    const testName = 'Temp User';

    // 1) Register user
    cy.visit('https://online-quiz-portal-website.onrender.com/register');
    cy.get('#name', { timeout: 10000 }).should('be.visible').type(testName);
    cy.get('#email').type(testEmail);
    cy.get('#password').type(testPassword);
    cy.get('#confirmPassword').type(testPassword);
    cy.get('button[type="submit"]').click();

    // 2) Ensure redirect to login
    cy.url({ timeout: 10000 }).should('include', '/login');

    // 3) Login
    cy.get('#email', { timeout: 10000 }).type(testEmail);
    cy.get('#password').type(testPassword);
    cy.get('button[type="submit"]').click();

    // 4) Confirm home/dashboard loaded (home uses "Welcome")
    cy.url({ timeout: 10000 }).should('not.include', '/login');
    cy.contains('Welcome', { timeout: 10000 }).should('exist');

    // 5) Navigate to Profile page
    cy.contains('Profile', { timeout: 10000 }).click();
    cy.url({ timeout: 10000 }).should('include', '/profile');

    // 6) Ensure profile fields present
    cy.get('#exampleFormControlInput2', { timeout: 10000 }).should('be.visible');
    cy.get('#exampleFormControlInput1', { timeout: 10000 }).should('be.visible');

    // 7) Click the "Back" button on Profile to return to the previous page
    // Prefer exact button text. If Back is not a <button>, use a fallback selector.
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Back")').length) {
        cy.contains('button', 'Back', { timeout: 10000 }).click();
      } else if ($body.find('a:contains("Back")').length) {
        cy.contains('a', 'Back', { timeout: 10000 }).click();
      } else {
        // fallback: click any element with role="button" and text Back
        cy.contains('Back', { timeout: 10000 }).click();
      }
    });

    // 8) Verify we return to either /home or /user/reports
    cy.url({ timeout: 10000 }).should((url) => {
      const ok =
        url.includes('/home') ||
        url.includes('/user/reports') ||
        url.includes('/reports'); // extra tolerance
      expect(ok, `expected url to include /home or /user/reports but got ${url}`).to.be.true;
    });

    // 9) Make a contextual assertion based on destination to ensure page loaded correctly
    cy.url().then((url) => {
      if (url.includes('/home')) {
        // Home page - expect Welcome text
        cy.contains('Welcome', { timeout: 10000 }).should('exist');
      } else {
        // Reports page - expect Reports heading or table
        // Try a few likely texts so small wording differences won't break test
        cy.contains(/Reports|My Reports|Report List/i, { timeout: 10000 }).should('exist');
        // Optionally check a reports table or item
        // cy.get('.reports-table').should('exist');
      }
    });

    // 10) Screenshot the page after returning (documentation)
    cy.screenshot('TC07_Returned_Page');

    // 11) Final small wait for stability (optional)
    cy.wait(300);
  });
});
