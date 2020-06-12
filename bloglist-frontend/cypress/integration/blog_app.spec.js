describe('Blog ', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Saska Testaaja',
            username: 'saseli',
            password: 'apina'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })
    describe('frontpage and log-in', function () {

        it('Login form is shown', function () {
            cy.contains('blogs')
            cy.contains('Login')
        })
        describe('Login', function () {
            it('user can log in with correct credentials', function () {

                cy.get('#username').type('saseli')
                cy.get('#password').type('apina')
                cy.get('#login-button').click()
                cy.contains('Saska Testaaja logged in')

            })
            it('fails with wrong credentials', function () {
                cy.get('#username').type('saseli')
                cy.get('#password').type('väärä')
                cy.get('#login-button').click()
                cy.contains('wrong')
            })

        })
    })

    describe('when logged in', function () {
        beforeEach(function () {
               cy.login({
                   username: 'saseli', password: 'apina'
            }) 
        })
        
        it('a new blog can be created', function () {
            
                cy.contains('new blog').click()
                cy.get('#title').type('Ihan uusi blogi by cypress')
                cy.get('#author').type('Testaaja')
                cy.get('#address').type('www')
                cy.get('#addBlog').click()
                cy.contains('a new blog')
                cy.contains('Testaaja')
            })
            describe('and several blogs exist', function () {
                beforeEach(function () {
                  cy.createBlog({ title: 'first', author: 'cypress', url:'http://', likes:0 })
                  cy.createBlog({ title: 'second', author: 'cypress', url:'http://', likes:2})
                  cy.createBlog({ title: 'third', author: 'cypress', url:'http://' ,likes:3})
                })
                it('blogs are ordered by number of likes', function(){
                    cy.get('#show-button').click()
                    cy.contains('likes 3')
                    cy.get('#show-button').click()
                    cy.contains('likes 2')
                })
            })
            describe('and a blog exists', function () {
                beforeEach(function () {
                  cy.createBlog({
                    title: 'new cypress test blog',
                    author: 'cypress',
                    url:'http://',
                    likes: 0
                  })
                })
            it('a blog can be liked', function () {
                cy.contains('new cypress test blog')
                cy.get('#show-button').click()
                cy.contains('likes 0')
                cy.get('#like-button').click()
                cy.contains('likes 1')

            })
            it('a blog can be removed if user logged in is the same who added the blog', function () {
                cy.get('#show-button').click()
                if (cy.get('#remove-button')) {
                    cy.get('#remove-button').click()
                    cy.get('html').should('not.contain', 'new cypress test blog')
                }
            })
        })
    })
})
