describe('TC01 – Signup with Valid Data', () => {
  it('User registers successfully on the Register page', () => {
    const timestamp = Date.now();
    const testEmail = `testuser_${timestamp}@example.com`;
    const testName  = `Test User`;

    // Visit register page
    cy.visit('https://online-quiz-portal-website.onrender.com/register');

    // Wait for page to load and Name field to be visible
    cy.get('#name', { timeout: 10000 }).should('be.visible').type(testName);

    // Fill other fields (adjust IDs after inspecting)
    cy.get('#email', { timeout: 10000 }).should('be.visible').type(testEmail);
    cy.get('#password', { timeout: 10000 }).should('be.visible').type('Test@1234');
    cy.get('#confirmPassword', { timeout: 10000 }).should('be.visible').type('Test@1234');

    // Submit form
    cy.get('button[type="submit"]').click();

    // Verify redirected to Login page
    cy.url({ timeout: 10000 }).should('include', '/login');

    // Screenshot after registration
    cy.screenshot('TC01_Signup_Success');
  });
});
