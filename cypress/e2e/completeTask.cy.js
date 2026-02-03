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

  it("Should hide the completed tasks when using the complete tasks visibility toggle", () => {
    cy.createTask("Task 1", "Notes");
    cy.createTask("To be completed", "Notes");
    cy.completeTask("To be completed");

    cy.get("[data-testid*='task-item']")
      .contains("To be completed")
      .should("be.visible");
    cy.get("[data-testid*='task-item']")
      .contains("Task 1")
      .should("be.visible");

    cy.hideCompletedTasks();
    cy.get("[data-testid='task-item-To be completed']").should("not.exist");
    cy.get("[data-testid*='task-item']")
      .contains("Task 1")
      .should("exist")
      .should("be.visible");
  });

  it("Should show the completed tasks using the complete tasks visibility toggle when the completed tasks were hidden ", () => {
    cy.createTask("Task 1", "Notes");
    cy.createTask("To be completed", "Notes");
    cy.completeTask("To be completed");
    cy.hideCompletedTasks();
    cy.get("[data-testid='task-item-To be completed']").should("not.exist");
    cy.showCompletedTasks();
    cy.get("[data-testid*='task-item']")
      .contains("To be completed")
      .should("exist")
      .should("be.visible");
    cy.get("[data-testid*='task-item']")
      .contains("Task 1")
      .should("exist")
      .should("be.visible");
  });
});
