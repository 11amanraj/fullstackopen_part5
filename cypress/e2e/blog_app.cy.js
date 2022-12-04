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

  describe('Login', function() {
    it('Successful Login', function() {
      cy.get('input:first').type('superman')
      cy.get('input:last').type('krypto')
      cy.contains('Submit').click()
      cy.contains('Clark Kent logged in')   
    })
  })
})