Cypress.Commands.add('createUserTask', (user) => {
    //realizado a exclusão do usuario a partir de uma com o banco
    //e realizando o cadastro de um novo usuario a partir de uma api
    cy.task('removeUser', user.email)
        .then(function (result) {
            cy.log(result)
        })

    cy.request({
        method: 'POST',
        url: Cypress.env('apiUrl') + '/users/',
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
        url: Cypress.env('apiHelper') + '/user',
        body: user
    }).then(function (response) {
        expect(response.status).to.eq(201)
    })
})


Cypress.Commands.add('deleteUser', (user) => {
    cy.request({
        method: 'DELETE',
        url: Cypress.env('apiHelper') + '/user/' + user.email
    }).then(function (response) {
        expect(response.status).to.eq(204)
    }) 
})

Cypress.Commands.add('recoveryPass', (user) => {
    cy.request({
        method: 'post',
        url: Cypress.env('apiUrl') + '/password/forgot',
        body: { email: user }
    }).then(result => {
        expect(result.status).to.eql(204)
    })
})

Cypress.Commands.add('getToken', (user) => {
    cy.request({
        method: 'GET',
        url: Cypress.env('apiHelper') + '/token/' + user
    }).then(result => {
        expect(result.status).to.eql(200)
        //cy.log(JSON.stringify(result.body))
        cy.log(result.body.token)
        Cypress.env('passToken', result.body.token)
    })
})

Cypress.Commands.add('apiLogin', (user) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('apiUrl') + '/sessions',
        body: { email: user.email,
                password: user.password }
    }).then(response => {
        expect(response.status).to.eql(200)

        const { user, token } = response.body

        window.localStorage.setItem('@ShaveXP:token', token)
        window.localStorage.setItem('@ShaveXP:user', JSON.stringify(user))
    })

    cy.visit('/')
})
