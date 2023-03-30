Cypress.Commands.add('createUserTask', (user) => {
    //realizado a exclusão do usuario a partir de uma com o banco
    //e realizando o cadastro de um novo usuario a partir de uma api
    cy.task('removeUser', user.email)
        .then(function (result) {
            cy.log(result)
        })

    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/users',
        body: user
    }).then(function (response) {
        expect(response.status).to.eq(201)
    })
})

Cypress.Commands.add('createUser', (user) => {
    //realizando o delete do usuario a partir de uma api helper
    //e realizando o cadastro de um novo usuário a partir da api helper
    // cy.request({
    //     method: 'DELETE',
    //     url: 'http://localhost:5000/user/' + user.email
    // }).then(function (response) {
    //     expect(response.status).to.eq(204)
    // })

    cy.request({
        method: 'POST',
        url: 'http://localhost:5000/user',
        body: user
    }).then(function (response) {
        expect(response.status).to.eq(201)
    })
})