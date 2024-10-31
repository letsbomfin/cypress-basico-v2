/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
beforeEach (() => {
    cy.visit('./src/index.html')
})

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário', function() {
    const logntext = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';
    
    cy.get('input[id="firstName"]')
      .should('be.visible')
      .type('Leticia')
      .should('have.value', 'Leticia')

    cy.get('#lastName').type('Bomfin')
    cy.get('#email').type('lebomfin@gmail.com')
    cy.get('#phone').type('31992154087')
    cy.get('#open-text-area').type(logntext, {delay: 0})
    
    cy.contains('button', 'Enviar').click()

    cy.get('.success')
      .should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
    cy.get('#firstName').type('Leticia')
    cy.get('#lastName').type('Bomfin')
    cy.get('#email').type('lebomfin')
    cy.get('#phone').type('31992154087')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error')
      .should('be.visible')
  })

  it('Campo telefone continua vazio apos informar caracteres nao numericos', function () {
    cy.get('#phone').type('qwerty')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.get('#firstName').type('Leticia')
    cy.get('#lastName').type('Bomfin')
    cy.get('#email').type('lebomfin')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error')
      .should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('#firstName').type('Leticia').should('have.value', 'Leticia')
    cy.get('#lastName').type('Bomfin').should('have.value', 'Bomfin')
    cy.get('#email').type('lebomfin@gmail.com').should('have.value', 'lebomfin@gmail.com')
    cy.get('#phone').type('31992154087').should('have.value', '31992154087')
    cy.get('#open-text-area').type('Teste').should('have.value', 'Teste')

    cy.get('#firstName').clear().should('have.value', '')
    cy.get('#lastName').clear().should('have.value', '')
    cy.get('#email').clear().should('have.value', '')
    cy.get('#phone').clear().should('have.value', '')
    cy.get('#open-text-area').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error')
      .should('be.visible')
  })

  it('envia formulario com sucesso usando comando customizado', function () {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('Seleciona o item YouTube pelo texto', function () {
    cy.get('#product').select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function () {
    cy.get('#product').select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function () {
    cy.get('#product').select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback', function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check().should('have.value', "feedback")
  })

  it('marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })    
  })

  it('marca ambos checkboxes, depois desmarca o último', function () {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
  
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.get('#firstName').type('Leticia')
    cy.get('#lastName').type('Bomfin')
    cy.get('#email').type('lebomfin')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error')
      .should('be.visible')
  })

  it('seleciona um arquivo da pasta fixtures', function () {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', function () {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]#file-upload')
      .selectFile('@sampleFile')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

      cy.contains('Talking About Testing').should('be.visible')
  })
  })

