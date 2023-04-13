
Cypress.Commands.add('noticeErrorShouldBe', (expectedText) => {
    cy.get('.notice-container', { timeout: 10000 })
        .should('be.visible')
        .find('.error p')
        .should('have.text', expectedText)
})

Cypress.Commands.add('noticeSuccessShouldBe', (expectedText) => {
    cy.get('.notice-container', { timeout: 10000 })
        .should('be.visible')
        .find('.success p')
        .should('have.text', expectedText)
})