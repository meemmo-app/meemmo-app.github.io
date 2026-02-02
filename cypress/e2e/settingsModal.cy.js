describe("Settings modal", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.clearLocalStorage();
  });

  it("Should open the settings modal when the button is clicked", () => {
    cy.get("[name='Settings']").click();
    cy.get("[data-testid='settings-modal']")
      .should("exist")
      .should("contain.text", "Scarica dati")
      .should("contain.text", "Carica dati");
  });

  it("Should close the settings modal when the X button is clicked", () => {
    cy.get("[name='Settings']").click();
    cy.get("[data-testid='settings-modal']")
      .should("exist")
      .get("[data-testid='close-settings-modal']")
      .click();
  });
});
