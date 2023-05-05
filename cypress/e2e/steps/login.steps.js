import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor'

let user;

Given("que tenho o seguinte usuário:", function (userDataTable) {
    cy.log(JSON.stringify(userDataTable.rowsHash()))

    user = userDataTable.rowsHash()
    cy.createUser(user)
});

Given("que esse usuario tenha senha incorreta", function () {
    user.password = "abc123"
  });

Given("que acesso o totem", function () {
    cy.visit('/')
});

When("submeto essa credenciais", function () {
    cy.submitLogin(user.email, user.password)
});

Then("sou autenticado com sucesso", function () {
    cy.userShouldBeLoggedIn(user.name)
});

Then("devo ver a mensagem de alerta {string}", function (message) {
    cy.noticeErrorShouldBe(message)
  });

