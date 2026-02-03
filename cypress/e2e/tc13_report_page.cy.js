// cypress/e2e/TC13_Report_Page.cy.js
/// <reference types="cypress" />

describe('TC13 – Report Page Accessible After Submitting Quiz', () => {
  it('Registers, logs in, takes a quiz, submits, then verifies reports page', () => {

    const ts = Date.now();
    const email = `tempuser_${ts}@example.com`;
    const password = 'Test@1234';

    // 1) Register
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
    cy.url({ timeout: 10000 }).should('not.include', '/login');
    cy.contains('Welcome', { timeout: 10000 }).should('exist');

    // 3) Start first quiz
    cy.get('div.card-lg', { timeout: 15000 }).first().within(() => {
      cy.get('button.primary-outlined-btn').click();
    });

    // 4) On instructions page, click Start Exam
    cy.url({ timeout: 10000 }).should('include', '/user/write-exam');
    cy.contains('button', 'Start Exam', { timeout: 10000 }).click();

    // 5) Wait for first question container
    cy.get('div.flex.flex-col.gap-2.mt-2', { timeout: 15000 }).should('exist');

    // 6) Answer questions dynamically until Submit
    const answerLoop = () => {
      cy.get('div.flex.justify-between > h1.text-2xl', { timeout: 15000 })
        .should('be.visible')
        .then(() => {
          cy.get('div.option').first().click();
          cy.get('button.primary-contained-btn', { timeout: 10000 }).then($btn => {
            const txt = $btn.text().trim();
            if (/^Next$/i.test(txt)) {
              cy.wrap($btn).click();
              cy.wait(300);
              answerLoop();
            } else if (/^Submit$/i.test(txt)) {
              cy.wrap($btn).click();
            } else {
              cy.wrap($btn).click();
            }
          });
        });
    };
    answerLoop();

    // 7) Wait for server-side processing
    cy.wait(1000);

    // 8) Visit reports page
    cy.visit('https://online-quiz-portal-website.onrender.com/user/reports');
    cy.url({ timeout: 10000 }).should('include', '/user/reports');

    // 9) Verify table headers
    cy.get('table thead').within(() => {
      cy.contains('Exam Name').should('exist');
      cy.contains('Date').should('exist');
      cy.contains('Total Marks').should('exist');
      cy.contains('Passing Marks').should('exist');
      cy.contains('Obtained Marks').should('exist');
      cy.contains('Verdict').should('exist');
    });

    // 10) Verify at least one quiz attempt row exists
    cy.get('table tbody tr.ant-table-row', { timeout: 15000 }).should('have.length.at.least', 1)
      .first()
      .within(() => {
        cy.get('td').eq(0).should('not.be.empty'); // Exam Name
        cy.get('td').eq(1).invoke('text').should('match', /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/); // Date
        cy.get('td').eq(4).invoke('text').should('match', /[0-9]+/); // Obtained Marks
        cy.get('td').eq(5).invoke('text').should('match', /Pass|Fail/i); // Verdict
      });

    // 11) Screenshot reports page
    cy.wait(500);
    cy.screenshot('TC13_Report_Page', { capture: 'viewport' });
  });
});
