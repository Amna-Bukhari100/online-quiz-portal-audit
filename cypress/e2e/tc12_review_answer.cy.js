// cypress/e2e/TC12_Review_Answers.cy.js
/// <reference types="cypress" />

describe('TC12 – Review Answers', () => {
  it('User can review all answers after submitting the quiz', () => {
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

    // 2) Login
    cy.url({ timeout: 10000 }).should('include', '/login');
    cy.get('#email').type(testEmail);
    cy.get('#password').type(testPassword);
    cy.get('button[type="submit"]').click();

    // 3) Confirm Home page loaded
    cy.url({ timeout: 10000 }).should('not.include', '/login');
    cy.contains('Welcome', { timeout: 10000 }).should('exist');

    // 4) Start first quiz
    cy.get('div.card-lg', { timeout: 10000 }).first().within(() => {
      cy.get('button.primary-outlined-btn').should('be.visible').click();
    });

    // 5) Instructions page
    cy.url({ timeout: 10000 }).should('include', '/user/write-exam');
    cy.contains('button', 'Start Exam', { timeout: 10000 }).click();

    // 6) Answer questions dynamically (same pattern as TC11)
    function answerQuestion() {
      cy.get('div.flex.justify-between > h1.text-2xl', { timeout: 10000 })
        .should('be.visible')
        .then(() => {
          // select first option
          cy.get('div.option').first().click();

          // detect Next / Submit button
          cy.get('button.primary-contained-btn').then(($btn) => {
            const btnText = $btn.text().trim();

            if (btnText === 'Next') {
              cy.wrap($btn).click();
              answerQuestion(); // repeat
            } else if (btnText === 'Submit') {
              cy.wrap($btn).click();
            }
          });
        });
    }

    answerQuestion();

    // 7) Click Review Answers
    cy.contains('button', 'Review Answers', { timeout: 10000 })
      .should('be.visible')
      .click();

    // 8) Verify at least one question is shown
    cy.get('div.flex.justify-between > h1.text-2xl', { timeout: 10000 })
      .should('have.length.at.least', 1);

    // 9) Check Retake and Close buttons exist
    cy.contains('button', 'Retake Exam').should('be.visible');
    cy.contains('button', 'Close').should('be.visible');

    // 10) Screenshot WITHOUT full-page mode (prevents timeout)
    cy.wait(500); // small buffer to stabilize view
    cy.screenshot('TC12_Review_Answers', { capture: 'viewport' });
  });
});
