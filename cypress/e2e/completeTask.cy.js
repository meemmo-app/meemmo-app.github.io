describe("Delete task", () => {
  beforeEach(() => {
    cy.openWebApp();
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
