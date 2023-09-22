describe('Testes E2E - Realizando a compra de produtos com sucesso', () => {
    it.only('Fluxo de compra de produtos', () => {
      cy.login_teste('standard_user', 'secret_sauce')
      cy.get('.title').should('contain','Products')

      // Ordenação de produtos de menor para maior valor:
      cy.get('[data-test="product_sort_container"]').select('Price (low to high)')
      cy.get(':nth-child(1) > .inventory_item_description').should('contain', 'Sauce Labs Onesie')
      cy.get(':nth-child(2) > .inventory_item_description').should('contain', 'Sauce Labs Bike Light')
      cy.get(':nth-child(3) > .inventory_item_description').should('contain', 'Sauce Labs Bolt T-Shirt')

      // Adicionando produtos ao carrinho
      cy.contains('Sauce Labs Onesie').click()
      cy.get('.btn_primary').click()
      cy.get('[data-test="back-to-products"]').click()

      cy.contains('Sauce Labs Bike Light').click()
      cy.get('.btn_primary').click()
      cy.get('[data-test="back-to-products"]').click()

      cy.contains('Sauce Labs Bolt T-Shirt').click()
      cy.get('.btn_primary').click()
      cy.get('[data-test="back-to-products"]').click()

      //Checagem da quantidade de produtos adicionados no carrinho
      cy.get('.shopping_cart_link').should('have.text', '3')

      //Check carrinho
      cy.get('.shopping_cart_link').click()
      cy.verificaProdutos()
      cy.get('[data-test="checkout"]').click()

      // Adicionando Login
      cy.get('[data-test="firstName"]').type('Tony Leonel')
      cy.get('[data-test="lastName"]').type('Rodrigues')
      cy.get('[data-test="postalCode"]').type('11990-000')
      cy.get('[data-test="continue"]').click()

      // Validando se o Produto foi para a tela de Processamento
      cy.get('.app_logo').should('contain', 'Swag Labs')
      
      // Validando os produtos
      cy.verificaProdutos()
      cy.get('[data-test="finish"]').click()

      //Validando se o produto foi finalizado com sucesso
      cy.get('.complete-header').should('contain', 'Thank you for your order!')
    });
    });
    