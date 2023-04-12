import shared from '../../shared'

class LoginPage {

    constructor( ) {
        this.alertErro ='.alert-error'
        this.shared = shared
    }

    submit(email = null, password = null) {
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
    }

    requiredFiels(emailMessage, passwordMessage) {
        cy.get(this.alertErro)
                .should('have.length', 2)
                .and(($small) => {
                    expect($small.get(0).textContent).to.equal(emailMessage)
                    expect($small.get(1).textContent).to.equal(passwordMessage)
                })
    }

}

export default new LoginPage()