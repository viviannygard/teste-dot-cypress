Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#lastName').type('Bispo')
    cy.get('#firstName').type('Vivian')    
    cy.get('#email').type('vnaygard@gmail.com')
    cy.get('#open-text-area').type('Testes')
    cy.get('button[type="submit"]').click()
})