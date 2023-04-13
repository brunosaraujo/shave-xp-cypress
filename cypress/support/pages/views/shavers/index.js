

class ShaversPages {

    selectShaver(name) {
        cy.contains('figcaption h3', name)
            .should('be.visible')
            .click()
    }
}

export default new ShaversPages()