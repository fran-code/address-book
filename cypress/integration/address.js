describe('Save address', () => {

    it('should allow a typical user flow', () => {
        cy.visit('http://localhost:3000')

        cy.get('.saveAddressForm').within(() => {
            cy.contains('div', 'Names').find('textarea').first().type('Fran')
            cy.contains('div', 'Telephones').find('textarea').first().type('02012345567')
            cy.contains('button', 'Save').click()
        })

        cy.contains('a', 'List').click()
        cy.contains('td', 'Fran').should("exist")
        cy.contains('td', '02012345567').should("exist")

        cy.contains('a', 'Search').click()
        cy.get(".form-control").type('Fr')
        cy.contains('button', 'Search').click()
        cy.contains('td', 'Fran').should("exist")
        cy.contains('td', '02012345567').should("exist")
        cy.contains('button', 'Clear').click()
        cy.contains('td', 'Fran').should("not.exist")
        cy.contains('td', '02012345567').should("not.exist")
        cy.contains('button', 'Telephone').click()
        cy.get(".form-control").type('02012345567')
        cy.contains('button', 'Search').click()
        cy.contains('td', 'Fran').should("exist")
        cy.contains('td', '02012345567').should("exist")
    })
})