

class Header {

    userShouldLoggedIn(name) {

        //Remove o tudo o que tem depois do espaço no nome
        const firstName = name.split(' ')[0]

        cy.get('.logged-user div a')
            .should('be.visible')
            .should('have.text', 'Olá, ' + firstName)
    }    
}

export default new Header()