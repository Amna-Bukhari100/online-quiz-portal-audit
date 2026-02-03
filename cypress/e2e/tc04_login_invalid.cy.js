describe('TC04 – Login with Invalid Credentials', () => {
  it('Shows error when login fails with invalid email or password', () => {
    // Step 1: Visit Login page
    cy.visit('https://online-quiz-portal-website.onrender.com/login');

    // Step 2: Enter invalid credentials
    cy.get('#email', { timeout: 10000 }).type('nonexistent_user@example.com');
    cy.get('#password').type('WrongPassword123');

    // Step 3: Click Login button
    cy.get('button[type="submit"]').click();

    // Step 4: Wait for alert span to appear and verify text
    cy.contains('span', 'User doesnot exist.', { timeout: 10000 })
      .should('be.visible')
      .screenshot('TC04_Alert'); // Screenshot only the alert element

    // Optional: wait a bit before taking a full-page screenshot
    cy.wait(1000);
    cy.screenshot('TC04_Login_Invalid_FullPage');

    // Step 5: Ensure still on login page
    cy.url().should('include', '/login');
  });
});

