describe("settings modal", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("open the settings modal when the button is clicked", () => {
    cy.get("[name='Settings']").click();
    cy.get("[data-testid='cypress-settings-modal']").should("exist");
  });

  it("close the settings modal when the X button is clicked", () => {
    cy.get("[name='Settings']").click();
    cy.get("[data-testid='cypress-settings-modal']").should("exist");
    cy.get(
      "[data-testid='cypress-settings-modal'] >> [data-testid='cypress-close-modal']",
    )
      .should("be.visible")
      .click();
    cy.get("[data-testid='cypress-settings-modal']").should("not.exist");
  });
});
