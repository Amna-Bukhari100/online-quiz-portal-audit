// cypress/e2e/TC11_Submit_Quiz_Dynamic.cy.js
/// <reference types="cypress" />

describe('TC11 – Complete and Submit Quiz (Dynamic Questions)', () => {
  it('Answers all questions dynamically and submits the quiz', () => {
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
    cy.get('#email', { timeout: 10000 }).type(testEmail);
    cy.get('#password').type(testPassword);
    cy.get('button[type="submit"]').click();

    // 3) Confirm home page loaded
    cy.url({ timeout: 10000 }).should('not.include', '/login');
    cy.contains('Welcome', { timeout: 10000 }).should('exist');

    // 4) Wait for quizzes to appear
    cy.get('div.card-lg', { timeout: 10000 }).should('have.length.at.least', 1);

    // 5) Start first quiz
    cy.get('div.card-lg').first().within(() => {
      cy.get('button.primary-outlined-btn').should('be.visible').click();
    });

    // 6) Instructions page
    cy.url({ timeout: 10000 }).should('include', '/user/write-exam');
    cy.contains('button', 'Start Exam', { timeout: 10000 }).click();

    // 7) Wait for first question
    cy.get('div.flex.flex-col.gap-2.mt-2', { timeout: 10000 }).should('exist');

    // 8) Loop through questions dynamically until Submit
    function answerQuestion() {
      // Wait for question number
      cy.get('div.flex.justify-between > h1.text-2xl', { timeout: 10000 })
        .should('be.visible')
        .then(($question) => {
          const qText = $question.text();
          cy.log('Answering question: ' + qText);

          // Select first option
          cy.get('div.option').first().click();

          // Check if Next button exists
          cy.get('button.primary-contained-btn').then(($btn) => {
            const btnText = $btn.text().trim();
            if (btnText === 'Next') {
              cy.wrap($btn).click();
              answerQuestion(); // recursive call for next question
            } else if (btnText === 'Submit') {
              cy.wrap($btn).click();
            }
          });
        });
    }

    // 9) Start answering questions dynamically
    answerQuestion();

    // 10) Verify completion
    cy.contains('button', 'Review Answers', { timeout: 10000 }).should('be.visible');
    cy.contains('button', 'Retake Exam', { timeout: 10000 }).should('be.visible');

    // 11) Screenshot
    cy.screenshot('TC11_Quiz_Completed_Dynamic');
  });
});
