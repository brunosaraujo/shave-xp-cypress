Cypress.Commands.add('submitLogin', (email = null, password = null) => {
    cy.visit('/')

    cy.get('input[placeholder$=email]').as('email')
    cy.get('input[placeholder*=senha]').as('password')

    if (email) {
        cy.get('@email').type(email)
    }

    if (password) {
        cy.get('@password').type(password)
    }

    cy.contains('button', 'Entrar').click()
})

Cypress.Commands.add('userShouldBeLoggedIn', (name) => {
    const firstName = name.split(' ')[0]

    cy.get('.logged-user div a')
        .should('be.visible')
        .should('have.text', 'Olá, ' + firstName)
})

Cypress.Commands.add('requiredFielsLogin', (emailMessage, passwordMessage) => {
    cy.get('.alert-error')
        .should('have.length', 2)
        .and(($small) => {
            expect($small.get(0).textContent).to.equal(emailMessage)
            expect($small.get(1).textContent).to.equal(passwordMessage)
        })
})