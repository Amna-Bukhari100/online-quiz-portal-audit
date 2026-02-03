describe('TC05 – View Profile Page', () => {
  it('User can view profile page with correct information', () => {
    // Step 0: Generate a unique temporary user
    const timestamp = Date.now();
    const testEmail = `tempuser_${timestamp}@example.com`;
    const testPassword = 'Test@1234';
    const testName = 'Temp User';

    // Step 1: Register the temporary user
    cy.visit('https://online-quiz-portal-website.onrender.com/register');
    cy.get('#name', { timeout: 10000 }).should('be.visible').type(testName);
    cy.get('#email').type(testEmail);
    cy.get('#password').type(testPassword);
    cy.get('#confirmPassword').type(testPassword);
    cy.get('button[type="submit"]').click();

    // Step 2: Ensure redirect to login page
    cy.url({ timeout: 10000 }).should('include', '/login');

    // Step 3: Log in with the new user
    cy.get('#email', { timeout: 10000 }).type(testEmail);
    cy.get('#password').type(testPassword);
    cy.get('button[type="submit"]').click();

    // Step 4: Verify Dashboard/Home page loaded
    cy.url({ timeout: 10000 }).should('not.include', '/login');
    cy.contains('Welcome').should('exist');

    // Step 5: Navigate to Profile page
    cy.contains('Profile').click(); // adjust text if different

    // Step 6: Verify Profile page URL
    cy.url({ timeout: 10000 }).should('include', '/profile');

    // Step 7: Verify input fields have correct values
    // Use actual input IDs from live site
    cy.get('#exampleFormControlInput2', { timeout: 10000 })  // email input (readonly)
      .should('be.visible')
      .and('have.value', testEmail);

    cy.get('#exampleFormControlInput1', { timeout: 10000 })  // name input
      .should('be.visible')
      .and('have.value', testName);

    // Step 8: Take screenshot for documentation
    cy.screenshot('TC05_Profile_Page');
  });
});

