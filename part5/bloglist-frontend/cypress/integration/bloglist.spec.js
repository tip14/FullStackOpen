describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('log in to application')
        cy.get('#username')
        cy.get('#password')
        cy.get('input[type=submit]')
    })
})


describe('Login',function() {

    const username = 'tuser'
    const password = 'tpass123'

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', {username, password})
        cy.visit('http://localhost:3000')
    })

    it('succeeds with correct credentials', function() {
        cy.get('#username').type(username)
        cy.get('#password').type(password)
        cy.get('input[type=submit]').click()
        cy.contains('logged in')
    })

    it.only('fails with wrong credentials', function() {
        cy.get('#username').type(username)
        cy.get('#password').type("78687")
        cy.get('input[type=submit]').click()
        cy.contains('wrong username or password').should('have.css', 'border', '2px solid rgb(255, 0, 0)')
    })
})