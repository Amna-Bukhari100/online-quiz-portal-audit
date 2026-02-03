// cypress/e2e/TC14_Logout.cy.js
/// <reference types="cypress" />

describe('TC14 – Logout', () => {
  it('User can logout successfully and is redirected to login page', () => {

    const ts = Date.now();
    const email = `tempuser_${ts}@example.com`;
    const password = 'Test@1234';

    // 1) Register a temporary user
    cy.visit('https://online-quiz-portal-website.onrender.com/register');
    cy.get('#name', { timeout: 10000 }).type('Temp User');
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('#confirmPassword').type(password);
    cy.get('button[type="submit"]').click();

    // 2) Login
    cy.url({ timeout: 10000 }).should('include', '/login');
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('button[type="submit"]').click();

    // 3) Ensure user is on home page
    cy.url({ timeout: 10000 }).should('not.include', '/login');
    cy.contains('Welcome', { timeout: 10000 }).should('exist');

    // 4) Click Logout
    cy.contains('span', 'Logout', { timeout: 10000 }).click();

    // 5) Verify user is redirected to login page
    cy.url({ timeout: 10000 }).should('include', '/login');
    cy.contains('button', 'Login', { timeout: 10000 }).should('be.visible');

    // 6) Screenshot after logout
    cy.screenshot('TC14_Logout_Success');
  });
});
