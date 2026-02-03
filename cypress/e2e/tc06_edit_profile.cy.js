// cypress/e2e/TC06_Edit_Profile.cy.js
/// <reference types="cypress" />

describe('TC06 – Edit Profile Information', () => {
  it('User can edit and save profile description (live-site selectors)', () => {
    // generate unique temp user
    const ts = Date.now();
    const testEmail = `tempuser_${ts}@example.com`;
    const testPassword = 'Test@1234';
    const testName = 'Temp User';
    const updatedDescription = 'Updated description from Cypress ' + ts;

    // Register the temporary user
    cy.visit('https://online-quiz-portal-website.onrender.com/register');
    cy.get('#name', { timeout: 10000 }).should('be.visible').type(testName);
    cy.get('#email').type(testEmail);
    cy.get('#password').type(testPassword);
    cy.get('#confirmPassword').type(testPassword);
    cy.get('button[type="submit"]').click();

    // Ensure redirect to login
    cy.url({ timeout: 10000 }).should('include', '/login');

    // Login with the new user
    cy.get('#email', { timeout: 10000 }).should('be.visible').type(testEmail);
    cy.get('#password').type(testPassword);
    cy.get('button[type="submit"]').click();

    // Ensure home/dashboard loaded
    cy.url({ timeout: 10000 }).should('not.include', '/login');
    cy.contains('Welcome', { timeout: 10000 }).should('exist');

    // Navigate to Profile (same as TC05)
    cy.contains('Profile', { timeout: 10000 }).click();
    cy.url({ timeout: 10000 }).should('include', '/profile');

    // Wait for email input to confirm profile page loaded
    cy.get('#exampleFormControlInput2', { timeout: 10000 }).should('be.visible');

    // Edit description (selector from your site)
    cy.get('#exampleFormControlInput3', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(updatedDescription);

    // Click Save (button text "Save" on your site)
    cy.contains('button', 'Save', { timeout: 10000 }).click();

    // === Wait for success toast and capture screenshots reliably ===
    // Prefer locating AntD success message by class; fallback to searching for "success" text.
    // First try the AntD element, then fallback to text search.
    cy.get('body', { timeout: 10000 }).then(($body) => {
      if ($body.find('.ant-message-notice-content .ant-message-success').length) {
        // Wait for the AntD success element to be visible
        cy.get('.ant-message-notice-content .ant-message-success', { timeout: 10000 })
          .should('be.visible');
      } else if ($body.find('.ant-message-notice .ant-message-success').length) {
        cy.get('.ant-message-notice .ant-message-success', { timeout: 10000 }).should('be.visible');
      } else {
        // fallback: wait for any visible text containing "success"
        cy.contains(/success/i, { timeout: 10000 }).should('be.visible');
      }
    });

    // Take a full-page screenshot while the toast is visible.
    // Using fullPage avoids flaky retries caused by element detaching.
    cy.screenshot('TC06_FullPage_AfterSave', { capture: 'fullPage' });

    // Optional small wait to let UI settle before verifying values (keeps things stable)
    cy.wait(250);

    // Also verify the description input retained the updated value
    cy.get('#exampleFormControlInput3', { timeout: 10000 })
      .should('have.value', updatedDescription);

    // Extra: small section screenshot (optional)
    cy.screenshot('TC06_Profile_Section_AfterSave');
  });
});
