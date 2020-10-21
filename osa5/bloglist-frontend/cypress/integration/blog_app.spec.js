describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Mr. Dog',
      username: 'doggo',
      password: 'bones'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#loginForm')
      .contains('#loginForm', 'username')
      .contains('#loginForm', 'password')
    cy.get('button').contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('doggo')
      cy.get('#password').type('bones')
      cy.get('#login-button').click()
      cy.contains('Mr. Dog logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('doggo')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.message')
        .should('contain','wrong username or password')
        .and('have.css', 'background-color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Mr. Dog logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'doggo', password: 'bones' })
    })

    it('A blog can be created', function() {
      cy.get('#toggle').click()
      cy.get('#title').type('Introduction to Cypress')
      cy.get('#author').type('Cypress team')
      cy.get('#url').type('https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Default-Values')
      cy.get('button').contains('create').click()

      cy.get('.blog-list').contains('Introduction to Cypress')
    })
  })
})