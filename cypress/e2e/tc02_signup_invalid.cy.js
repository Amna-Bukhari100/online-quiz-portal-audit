describe('TC02 – Signup with Invalid Data', () => {
  it('Shows validation errors when registration fields are empty', () => {
    // Visit Register page
    cy.visit('https://online-quiz-portal-website.onrender.com/register');

    // Wait for Name field
    cy.get('#name', { timeout: 10000 }).should('be.visible');

    // Click Submit with all fields empty
    cy.get('button[type="submit"]').click();

    // Form should NOT submit, still on /register page
    cy.url().should('include', '/register');

    // Check each required field is invalid
    cy.get('#name').then(($input) => {
      expect($input[0].checkValidity()).to.eq(false);
    });

    cy.get('#email').then(($input) => {
      expect($input[0].checkValidity()).to.eq(false);
    });

    cy.get('#password').then(($input) => {
      expect($input[0].checkValidity()).to.eq(false);
    });

    cy.get('#confirmPassword').then(($input) => {
      expect($input[0].checkValidity()).to.eq(false);
    });

    // Take screenshot for documentation
    cy.screenshot('TC02_Register_InvalidData');
  });
});
