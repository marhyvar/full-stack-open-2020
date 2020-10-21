describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Mr. Dog',
      username: 'doggo',
      password: 'bones'
    }
    const user2 = {
      name: 'Mr. Cat',
      username: 'kitty',
      password: 'fish'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
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

    it('A blog added by the user can be deleted by the same user', function() {
      cy.createBlog({
        title: 'The Go blog',
        author: 'Gophers',
        url: 'https://blog.golang.org/'
      })
      cy.createBlog({
        title: 'Go 1.15 is released',
        author: 'Gophers',
        url: 'https://blog.golang.org/go1.15/'
      })
      cy.contains('The Go blog Gophers').contains('view').click()
      cy.get('.moreInfo').contains('The Go blog Gophers').parent().contains('remove').click()
      cy.contains('blog The Go blog by Gophers was deleted')
      cy.get('.lessInfo').should('have.length', 1)
    })

    it('A blog added by the user can not be deleted by another user', function() {
      cy.createBlog({
        title: 'The Go blog',
        author: 'Gophers',
        url: 'https://blog.golang.org/'
      })
      cy.createBlog({
        title: 'Go 1.15 is released',
        author: 'Gophers',
        url: 'https://blog.golang.org/go1.15/'
      })

      cy.contains('logout').click()
      cy.login({ username: 'kitty', password: 'fish' })
      cy.contains('The Go blog Gophers').contains('view').click()
      cy.get('.moreInfo').contains('The Go blog Gophers').parent()
        .contains('remove').should('not.exist')
    })

    describe('and blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'The Go blog',
          author: 'Gophers',
          url: 'https://blog.golang.org/'
        })
        cy.createBlog({
          title: 'Go 1.15 is released',
          author: 'Alex Rakoczy',
          url: 'https://blog.golang.org/go1.15'
        })
        cy.createBlog({
          title: 'Pkg.go.dev is open source!',
          author: 'Julie Qiu',
          url: 'https://blog.golang.org/pkgsite'
        })
      })

      it('blog can be liked', function () {
        cy.contains('The Go blog Gophers').contains('view').click()

        cy.get('button').contains('like').click()

        cy.get('.moreInfo').contains('The Go blog Gophers').parent().contains('likes 1')
      })

      it('blogs are arranged according to likes', function () {
        cy.contains('Pkg.go.dev is open source!').contains('view').click()
        cy.get('.moreInfo').contains('Pkg.go.dev is open source!')
          .parent().find('.like-button').as('button1')
        cy.get('@button1').click()
        cy.get('@button1').click()

        cy.contains('Go 1.15 is released').contains('view').click()
        cy.get('.moreInfo').contains('Go 1.15 is released')
          .parent().find('.like-button').as('button2')
        cy.get('@button2').click()

        cy.get('.likes').then(elems => {
          // https://stackoverflow.com/questions/52950149/cypressts-get-text-from-htmlelement
          const texts = [...elems].map(el => el.textContent.trim())

          expect(texts).to.deep.eq([
            'likes 2',
            'likes 1',
            'likes 0'
          ])
        })
      })
    })
  })
})