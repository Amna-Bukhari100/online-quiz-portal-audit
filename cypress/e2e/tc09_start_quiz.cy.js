// cypress/e2e/TC09_Start_Quiz.cy.js
/// <reference types="cypress" />

describe('TC09 – Start Quiz', () => {
  it('Navigates to instructions, starts quiz, and verifies first question', () => {
    const ts = Date.now();
    const testEmail = `tempuser_${ts}@example.com`;
    const testPassword = 'Test@1234';
    const testName = 'Temp User';

    // 1) Register user
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

    // 6) Click Start Exam button on first quiz card
    cy.get('div.card-lg').first().within(() => {
      cy.get('button.primary-outlined-btn').should('be.visible').click();
    });

    // 7) Instructions page
    cy.url({ timeout: 10000 }).should('include', '/user/write-exam');

    // 8) Click Start Exam on instructions page
    cy.contains('button', 'Start Exam', { timeout: 10000 }).should('be.visible').click();

    // 9) Wait for Next button to appear (ensures first question loaded)
    cy.get('button.primary-contained-btn', { timeout: 10000 }).should('be.visible');

    // 10) Verify first question is visible
    cy.get('div.flex.flex-col.gap-2.mt-2').within(() => {
      cy.get('div.flex.justify-between > h1.text-2xl')
        .should('be.visible')
        .and('contain.text', '1 :'); // confirms first question
    });

    // 11) Screenshot first question
    cy.wait(300);
    cy.screenshot('TC09_First_Question');
  });
});
