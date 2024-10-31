Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function () {
    cy.get('#firstName').type('Leticia')
    cy.get('#lastName').type('Bomfin')
    cy.get('#email').type('lebomfin@gmail.com')
    cy.get('#phone').type('31992154087')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})
