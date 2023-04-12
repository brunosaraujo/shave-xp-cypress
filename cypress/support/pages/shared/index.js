class SharedSteps {

    noticeErrorShouldBe(expectedText) {
        cy.get('.notice-container', { timeout: 10000 })
            .should('be.visible')
            .find('.error p')
            .should('have.text', expectedText)
    }

    noticeSuccessShouldBe(expectedText) {
        cy.get('.notice-container', { timeout: 10000 })
            .should('be.visible')
            .find('.success p')
            .should('have.text', expectedText)
    }

    alertShouldBe(message) {
        cy.get('.alert-error')
            .should('be.visible')
            .should('have.text', message)
    }
}

export default new SharedSteps()