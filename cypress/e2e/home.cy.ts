describe("Home Page Test", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/");
      cy.viewport(1280, 1080)
    });

    it("shows the homescreen contents for un-logged-in person", () => {

        // testing main elements
        cy.get("[data-test='title-item']");
        cy.get("[data-test='subheadding-item']");

        // testing cookie prompt
        cy.get("[data-test='cookie-item']");
        cy.get("[data-test='cookie-text']");
        cy.get("[data-test='cookieDecline-button']");
        cy.get("[data-test='cookieAllow-button']");
        cy.get("[data-test='cookieAllow-button']").click();
        cy.get("[data-test='cookie-item']").should('not.be.visible');

        // testing form - incorrect 
        cy.get("[data-test='form-item']");
        cy.get('[data-test="submitButton"]');
        cy.get('[data-test="submitButton"]').click();
        cy.get("[data-test='lat-invalid']").should("exist");
        cy.get("[data-test='lon-invalid']").should("exist");

        // testing form - correct 
        cy.get("[data-test='form-item']");
        cy.get('[data-test="lat-input"]').type('10');
        cy.get('[data-test="lon-input"]').type('10');
        cy.get('[data-test="observation-text"]').type('this is a cypress test');
        cy.get('[data-test="submitButton"]');
        cy.get('[data-test="submitButton"]').click();
        cy.get("[data-test='submission-conformation']").should("exist");

        
    })

});

export {};