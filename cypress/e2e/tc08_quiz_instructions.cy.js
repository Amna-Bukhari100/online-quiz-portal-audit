// cypress/e2e/TC08_load_instructions.cy.js
/// <reference types="cypress" />

describe('TC08 – Open a Quiz (up to instructions page)', () => {
  it('Quiz opens and instructions page is visible', () => {
    const ts = Date.now();
    const testEmail = `tempuser_${ts}@example.com`;
    const testPassword = 'Test@1234';
    const testName = 'Temp User';

    // 1) Register temporary user
    cy.visit('https://online-quiz-portal-website.onrender.com/register');
    cy.get('#name', { timeout: 10000 }).type(testName);
    cy.get('#email').type(testEmail);
    cy.get('#password').type(testPassword);
    cy.get('#confirmPassword').type(testPassword);
    cy.get('button[type="submit"]').click();

    // 2) Redirect to login
    cy.url({ timeout: 10000 }).should('include', '/login');

    // 3) Login
    cy.get('#email', { timeout: 10000 }).type(testEmail);
    cy.get('#password').type(testPassword);
    cy.get('button[type="submit"]').click();

    // 4) Confirm Home page loaded
    cy.url({ timeout: 10000 }).should('not.include', '/login');
    cy.contains('Welcome', { timeout: 10000 }).should('exist');

    // 5) Wait for quizzes to appear
    cy.get('div.card-lg', { timeout: 10000 }).should('have.length.at.least', 1);

    // 6) Click Start Exam button on the first quiz card
    cy.get('div.card-lg').first().within(() => {
      cy.get('button.primary-outlined-btn').should('be.visible').click();
    });

    // 7) Confirm navigation to instructions page
    cy.url({ timeout: 10000 }).should('include', '/user/write-exam');

    // 8) Verify quiz title on instructions page
    cy.get('h1.text-center', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Javascript Basics');

    // 9) Screenshot of instructions page
    cy.screenshot('TC08_Instructions_Page');
  });
});
