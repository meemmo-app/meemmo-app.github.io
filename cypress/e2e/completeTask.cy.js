describe("Delete task", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.clearLocalStorage();
    cy.get("h1").should("exist").should("have.text", "MEEMMO");
  });

  it("Should complete the task using the button", () => {
    cy.createTask("To be completed", "Notes");
    cy.get("[data-testid*='task-item']").contains("To be completed");
    cy.completeTask("To be completed");
    cy.isTaskCompleted("To be completed", true);
  });

  it("Should uncomplete the task using the button 2 times", () => {
    cy.createTask("To be completed", "Notes");
    cy.get("[data-testid*='task-item']").contains("To be completed");
    cy.completeTask("To be completed");
    cy.isTaskCompleted("To be completed", true);
    cy.completeTask("To be completed");
    cy.isTaskCompleted("To be completed", false);
  });
});
