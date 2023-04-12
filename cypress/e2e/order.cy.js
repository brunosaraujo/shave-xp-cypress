
import data from '../fixtures/order.json'

import shaversPage from '../support/pages/views/shavers'
import catalogPage from '../support/pages/views/catalog'
import orderPage from '../support/pages/views/order'


describe('pedido', () => {

    context('usuario logado', () => {

        //inportação das massas de order
        const { customer, shaver, service } = data

        before(() => {

            cy.createUser(customer)
            cy.uiLogin(customer)
        })


        it('deve poder solicitar serviços', () => {
            shaversPage.selectShaver(shaver.name)
            catalogPage.hasShaver(shaver.name)
            
            catalogPage.selectService(service.description)
            catalogPage.hasTitle(service.description)

            catalogPage.confirmOrder()
            orderPage.hasOrder()
        })


    })

})

describe.only('pedido', () => {

    context('usuario logado via api', () => {

        //inportação das massas de order
        const { customer, shaver, service } = data

        before(() => {

            cy.createUser(customer)
            cy.apiLogin(customer)
        })


        it('deve poder solicitar serviços', () => {
            shaversPage.selectShaver(shaver.name)
            catalogPage.hasShaver(shaver.name)
            
            catalogPage.selectService(service.description)
            catalogPage.hasTitle(service.description)

            catalogPage.confirmOrder()
            orderPage.hasOrder()
        })


    })

})