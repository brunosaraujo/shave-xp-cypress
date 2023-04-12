//const { defineConfig } = require("cypress");

import loginPage from '../support/pages/views/login'
import shaversPage from '../support/pages/views/shavers'

import data from '../fixtures/users-login.json'

describe('login', () => {

    context('quando submeto o formulário', () => {

        it('deve logar com sucesso utilizando 100% cypress', () => {
            // dessa forma utilizamos 100% do cypress
            cy.fixture('users-login.json').then(function (data) {
                loginPage.submit(data.success.email, data.success.password)
                shaversPage.header.userShouldLoggedIn(data.success.name)
            })
        })

        it('deve logar com sucesso', () => {
            const user = data.success

            cy.createUser(user)

            loginPage.submit(data.success.email, data.success.password)
            shaversPage.header.userShouldLoggedIn(data.success.name)

        })

        it('não deve logar com senha incorreta', () => {
            // realizando um immport para montar o objeto de teste
            // utilizamos 100% do java script
            const user = data.invpass

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.shared.noticeErrorShouldBe(message)

        })

        it('não deve logar com e-mail não cadastrado', () => {
            const user = data.email404

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.shared.noticeErrorShouldBe(message)

        })

        it('campos obrigarórios', () => {
            loginPage.submit()
            loginPage.requiredFiels('E-mail é obrigatório', 'Senha é obrigatória')

        })

    })

    context('senha muito curta', () => {

        const passwords = data.shortpass

        passwords.forEach((p) => {
            it(`Não deve logar com a senha: ${p}`, () => {
                loginPage.submit('papito@teste.com.br', p)

                loginPage.shared.alertShouldBe('Pelo menos 6 caracteres')

            })
        })

    })

    context('email no formato incorreto', () => {

        const emails = data.invemails

        emails.forEach((e) => {
            it(`Não deve logar com a email: ${e}`, () => {
                loginPage.submit(e, 'pwd123')

                loginPage.shared.alertShouldBe('Informe um email válido')
            })
        })

    })


})