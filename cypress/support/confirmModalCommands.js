Cypress.Commands.add("confirmModal", () => {
  cy.get("[data-testid='confirm-modal-ok']").click();
});

Cypress.Commands.add("discardModal", () => {
  cy.get("[data-testid='confirm-modal-discard']").click();
});
