describe('TC03 – Login with Valid Credentials', () => {
  it('Creates a temporary user and logs in successfully', () => {
    // Generate a unique email
    const timestamp = Date.now();
    const testEmail = `tempuser_${timestamp}@example.com`;
    const testPassword = 'Test@1234';
    const testName = 'Temp User';

    // Step 1: Visit Register page to create a temporary user
    cy.visit('https://online-quiz-portal-website.onrender.com/register');

    // Fill registration form
    cy.get('#name', { timeout: 10000 }).should('be.visible').type(testName);
    cy.get('#email', { timeout: 10000 }).should('be.visible').type(testEmail);
    cy.get('#password', { timeout: 10000 }).should('be.visible').type(testPassword);
    cy.get('#confirmPassword', { timeout: 10000 }).should('be.visible').type(testPassword);

    // Submit registration
    cy.get('button[type="submit"]').click();

    // Step 2: Ensure redirect to Login page
    cy.url({ timeout: 10000 }).should('include', '/login');

    // Step 3: Log in with the same temporary user
    cy.get('#email', { timeout: 10000 }).should('be.visible').type(testEmail);
    cy.get('#password', { timeout: 10000 }).should('be.visible').type(testPassword);
    cy.get('button[type="submit"]').click();

    // Step 4: Verify Home/Dashboard page loaded
    cy.url({ timeout: 10000 }).should('not.include', '/login');
    cy.contains('Welcome').should('exist'); // adjust selector/text for your Home page

    // Step 5: Screenshot for documentation
    cy.screenshot('TC03_Login_Valid');
  });
});
