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

        
    });

    it("Homepage for a logged in person", () => {

        // testing cookie prompt
        cy.get("[data-test='cookie-item']");
        cy.get("[data-test='cookie-text']");
        cy.get("[data-test='cookieDecline-button']");
        cy.get("[data-test='cookieAllow-button']");
        cy.get("[data-test='cookieAllow-button']").click();
        cy.get("[data-test='cookie-item']").should('not.be.visible');

        // test the map function for the test item made in the form above ^
        cy.get("tr").contains("this is a cypress test");
        cy.get(":nth-child(5) > .px-9 > :nth-child(4)").click();
        cy.get(".leaflet-container");
        cy.get(".leaflet-marker-pane > :nth-child(5)").invoke('show').click({force: true});
        cy.get(".leaflet-popup-content > div").contains("Lat: 10 - Lon: 10");
        cy.get("[data-test='home-ref']");
        cy.get("[data-test='home-ref']").click();
        

        // test the update function for the test item made in the form above ^
        cy.get("tr").contains("this is a cypress test");
        cy.get(":nth-child(5) > .px-9 > :nth-child(1)").click();
        cy.get('[data-test="observation-text"]').type(' that has been updated!');
        cy.get('[data-test="submitButton"]');
        cy.get('[data-test="submitButton"]').click();
        cy.get("tr").contains("this is a cypress test that has been updated!");


        // test the delete function for the test item made in the form above ^
        cy.get("tr").contains("this is a cypress test that has been updated!");
        cy.get(":nth-child(5) > .px-9 > :nth-child(2)").click();
        cy.get("tr").contains("this is a cypress test that has been updated!").should('not.exist');

        // testing on-going tickets is showing
        cy.get("[data-test='on-going-tickets']");

        // tests the table headders are showing 
        cy.get("[data-test='ticket-hedding']");
        cy.get("[data-test='lat-hedding']");
        cy.get("[data-test='lon-hedding']");
        cy.get("[data-test='observation-hedding']");
        cy.get("[data-test='weather-hedding']");
        cy.get("[data-test='response-hedding']");
        cy.get("[data-test='response-desc-hedding']");
        cy.get("[data-test='action-hedding']");

        // tests that the table contains "9C9A0" and has a lengh of 5 (the headers count as 1)
        cy.get("tr").contains("9C9A0");
        cy.get("tr").should("have.length", 5);

        // tests the search bar, types "3D2CF" and checks it is the only one showing 
        //(again, searches for length of 2 because the headers count as 1)
        cy.get("[data-test='search-bar']");
        cy.get("[data-test='search-bar']").type('3D2CF');
        cy.get("tr").contains("3D2CF");
        cy.get("tr").should("have.length", 2);
        cy.get("[data-test='search-bar']").clear();
        
        // testing the weather icons + text
        // weather temp
        cy.get(":nth-child(1) > .flex > :nth-child(1) > [data-test='temp-icon']");
        cy.get(":nth-child(1) > .flex > :nth-child(1) > [data-test='temp-icon']").trigger('mouseover');
        cy.get("[data-test='temp-title']");
        cy.get("[data-test='temp-desc']");

        // wind speed
        cy.get(":nth-child(1) > .flex > :nth-child(2) > [data-test='wind-icon']");
        cy.get(":nth-child(1) > .flex > :nth-child(2) > [data-test='wind-icon']").trigger('mouseover');
        cy.get("[data-test='wind-speed']");
        cy.get("[data-test='wind-desc']");

        // pressure
        cy.get(":nth-child(1) > .flex > :nth-child(3) > [data-test='pressure-icon']");
        cy.get(":nth-child(1) > .flex > :nth-child(3) > [data-test='pressure-icon']").trigger('mouseover');
        cy.get("[data-test='pressure-text']");

        // humidity
        cy.get(":nth-child(1) > .flex > :nth-child(4) > [data-test='humidity-icon']");
        cy.get(":nth-child(1) > .flex > :nth-child(4) > [data-test='humidity-icon']").trigger('mouseover');
        cy.get("[data-test='humidity-title']");
        cy.get("[data-test='humidity-vis']");

        // tests the archive page
        cy.get("[data-test='archive-ref']");
        cy.get("[data-test='archive-ref']").click();
        cy.get("[data-test='archive-title']");
        // tests the table headders are showing 
        cy.get("[data-test='ticket-hedding']");
        cy.get("[data-test='lat-hedding']");
        cy.get("[data-test='lon-hedding']");
        cy.get("[data-test='observation-hedding']");
        cy.get("[data-test='weather-hedding']");
        cy.get("[data-test='response-hedding']");
        cy.get("[data-test='response-desc-hedding']");
        cy.get("[data-test='action-hedding']");
        // tests that the table contains "9C9A0" and has a lengh of 5 (the headers count as 1)
        cy.get("tr").contains("9C9A0");
        cy.get("tr").should("have.length", 5);

    });

});

export {};