/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {  //define a suíte de testes,
    //const THREE_SECONDS_IN_MS = 3000 
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('CT01 - Validar envio formulário com sucesso', function() {
        const longText = 'Adicionar delay ao campo area visando diminuir o tempo de teste, funcionando como um copia e cola'

        cy.get('#firstName').type('Vivian')
        cy.get('#lastName').type('Bispo')
        cy.get('#phone').type('texto').should('have.text', '')
        cy.get('#email').type('vnaygard@gmail.com')
        cy.get('#open-text-area').type(longText,{delay: 5})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.get('.success').should('not.be.visible')

    })    
    it('CT02 - Validar envio formulário sem preenchimento', function() { 
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
    it('CT03 - Validar email formato invalido', function() { 
        cy.get('#lastName').type('Bispo')
        cy.get('#firstName').type('Vivian')
        cy.get('#open-text-area').type('E-mail formato invalido')
        cy.get('#email').type('vnaygardgmail.com')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.wait(3000)
    })    
    it('CT04 - Validar contato preferencial - Telefone marcado', function() { 
        cy.get('#lastName').type('Bispo')
        cy.get('#firstName').type('Vivian')
        cy.get('#open-text-area').type('Campo telefone')
        cy.get('#email').type('vnaygardgmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.wait(3000)
    })
    
    it('CT05 - Validar Tipo de atendimento - YouTube', function() {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')

    })
    it('CT06 - Validar Tipo de atendimento - Feedback', function() {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')

    })
    
    it('CT07 - Validar limpeza do Formulário após envio', function() { 
        cy.get('#firstName').type('Vivian').should('have.value', 'Vivian').clear().should('have.value', '')
        cy.get('#lastName').type('Bispo').should('have.value', 'Bispo').clear().should('have.value', '')
        cy.get('#open-text-area').type('Teste').should('have.value', 'Teste').clear().should('have.value', '')
        cy.get('#email').type('vnaygard@gmail.com').should('have.value', 'vnaygard@gmail.com').clear().should('have.value', '')
        cy.get('#phone-checkbox').click()
        cy.get('#phone').type('48984285858').should('have.value', '48984285858').clear().should('have.value', '')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
        cy.wait(3000)
    })
    

}) 