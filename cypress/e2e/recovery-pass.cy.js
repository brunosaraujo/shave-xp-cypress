import data from '../fixtures/users-login.json'

describe('esqueci minha senha', () => {

  it('deve poder solicitar o resgate de senha', () => {

    const user = data.recuperarSenha
    cy.createUser(user)

    cy.requestPassword(user.email)

    const message = 'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.'
    cy.noticeSuccessShouldBe(message)

  })

  context('quando o usuário solicita resgate de senha', () => {
    
    const user = data.resetarSenha

    beforeEach(()=>{
      cy.createUser(user)
      cy.recoveryPass(user.email)
      cy.getToken(user.email)
    })
    
    it('deve poder cadastrar uma nova senha', () => {
      cy.log(Cypress.env('passToken'))
      //Sempre que utilizar o Cypress.env tem de utilizar na forma de context. Pelo fato do cypress ser assincrono, 
      //não da tempo de iniciar o cypress jogar e pegar o token. O cypress acaba se perdendo.
      //Tem de criar um context e o beforeEach para ele ter acesso a indormação

      cy.resetSenha(Cypress.env('passToken'), 'abc123', 'abc123')

      const message = 'Agora você já pode logar com a sua nova senha secreta.'
      cy.noticeSuccessShouldBe(message)
    })

    afterEach(() => {
      cy.submitLogin(user.email, 'abc123')
      cy.userShouldBeLoggedIn(user.name)
    })
  })

  


})