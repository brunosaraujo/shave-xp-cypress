//const { defineConfig } = require("cypress");

import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

describe('login', () => {

    context('quando submeto o formulário', () => {

        it('deve logar com sucesso', () => {
            const user = {
                name: "Bruno",
                email: "bruno.araujo@system.com",
                password: "pwd123"
            }

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldLoggedIn(user.name)
        })

        it('não deve logar com senha incorreta', () => {
            const user = {
                email: "bruno.araujo@system.com",
                password: "pwd@123"
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)

        })

        it('não deve logar com e-mail não cadastrado', () => {
            const user = {
                email: "bruno.araujopwd@system.com",
                password: "pwd@123"
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)

        })

        it('campos obrigarórios', () => {
            loginPage.submit()
            loginPage.requiredFiels('E-mail é obrigatório', 'Senha é obrigatória')

        })

    })

    context('senha muito curta', () => {

        const passwords = [
            '1',
            '12',
            '123',
            '1234',
            '12345'
        ]

        passwords.forEach((p) => {
            it(`Não deve logar com a senha: ${p}`, () => {
                loginPage.submit('papito@teste.com.br', p)

                loginPage.alertShouldBe('Pelo menos 6 caracteres')

            })
        })

    })

    context('email no formato incorreto', () => {

        const emails = [
            'bruno&gmail.com',
            'bruno.com.br',
            '@gmail.com',
            '@',
            'papito@',
            '121323',
            '@#@!#!@',
            'xpto123'
        ]

        emails.forEach((e) => {
            it(`Não deve logar com a email: ${e}`, () => {
                loginPage.submit(e, 'pwd123')

                loginPage.alertShouldBe('Informe um email válido')
            })
        })

    })


})