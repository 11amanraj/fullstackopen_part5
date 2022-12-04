describe('Blog app', function() {
  beforeEach(function() {
    const newUser = {
      username: 'superman',
      name: 'Clark Kent',
      password: 'krypto'
    }
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST','http://localhost:3003/api/users', newUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login Attempt', function() {
    it('Successful Login', function() {
      cy.get('input:first').type('superman')
      cy.get('input:last').type('krypto')
      cy.contains('Submit').click()
      cy.contains('Clark Kent logged in')   
    })

    it('Unsuccessful Login', function() {
      cy.get('input:first').type('superman')
      cy.get('input:last').type('wrong')
      cy.contains('Submit').click()
      cy.get('.error').should('contain', 'invalid username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'background-color', 'rgb(214, 171, 166)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('input:first').type('superman')
      cy.get('input:last').type('krypto')
      cy.contains('Submit').click()
    })

    it('A blog can be created', function() {
      cy.get('#show-form').click()
      cy.get('#title-input').type('The Gunslinger')
      cy.get('#author-input').type('Stephen King')
      cy.get('#url-input').type('www.darktower.com')
      cy.get('#btn').click()
      cy.contains('The Gunslinger by Stephen King added')
      cy.get('#show-detail').click()
      cy.contains('www.darktower.com')
    })
  })
})