//const { defineConfig } = require("cypress");

import data from '../../fixtures/users-login.json'

describe('login', () => {

    context('quando submeto o formulário', () => {

        it('deve logar com sucesso utilizando 100% cypress', () => {
            // dessa forma utilizamos 100% do cypress
            cy.fixture('users-login.json').then(function (data) {
                cy.submitLogin(data.success.email, data.success.password)
                cy.userShouldBeLoggedIn(data.success.name)
            })
        })

        it('deve logar com sucesso', () => {
            const user = data.success

            cy.createUser(user)

            //loginPage.submit(user.email, user.password)
            cy.submitLogin(user.email, user.password)
            cy.userShouldBeLoggedIn(user.name)

        })

        it('não deve logar com senha incorreta', () => {
            // realizando um immport para montar o objeto de teste
            // utilizamos 100% do java script
            const user = data.invpass

            cy.submitLogin(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            cy.noticeErrorShouldBe(message)

        })

        it('não deve logar com e-mail não cadastrado', () => {
            const user = data.email404

            cy.submitLogin(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            cy.noticeErrorShouldBe(message)

        })

        it('campos obrigarórios', () => {
            cy.submitLogin()

            cy.get('.alert-error')
                .should('have.length', 2)
                .and(($small) => {
                    expect($small.get(0).textContent).to.equal('E-mail é obrigatório')
                    expect($small.get(1).textContent).to.equal('Senha é obrigatória')
                })

        })

    })

    context('senha muito curta', () => {

        const passwords = data.shortpass

        passwords.forEach((p) => {
            it(`Não deve logar com a senha: ${p}`, () => {
                cy.submitLogin('papito@teste.com.br', p)
                cy.alertShouldBe('Pelo menos 6 caracteres')

            })
        })

    })

    context('email no formato incorreto', () => {

        const emails = data.invemails

        emails.forEach((e) => {
            it(`Não deve logar com a email: ${e}`, () => {
                cy.submitLogin(e, 'pwd123')
                cy.alertShouldBe('Informe um email válido')
            })
        })

    })


})