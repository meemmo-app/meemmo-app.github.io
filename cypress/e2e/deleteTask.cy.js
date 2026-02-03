describe("Delete task", () => {
  beforeEach(() => {
    cy.openWebApp();
  });

  it("Should delete the task using the keyboard shortcut", () => {
    cy.createTask("To be deleted", "Notes");
    cy.get("[data-testid*='task-item']").contains("To be deleted");
    cy.get("body").type("j"); // to select the task
    cy.get("body").type("x"); // to delete the task
    cy.confirmModal();
    cy.get("[data-testid*='task-item']").should("not.exist");
  });

  it("Should delete the task using the button", () => {
    cy.createTask("To be deleted", "Notes");
    cy.get("[data-testid*='task-item']").contains("To be deleted").rightclick();
    cy.get("[data-testid*='task-item-delete-button']").click();
    cy.confirmModal();
    cy.get("[data-testid*='task-item']").should("not.exist");
  });

  it("Should delete only the selected task", () => {
    cy.createTask("Task 1", "Notes 1");
    cy.createTask("To be deleted", "Notes");
    cy.createTask("Task 2", "Notes 2");

    cy.deleteTask("To be deleted");
    cy.get("[data-testid*='task-item']")
      .contains("To be deleted")
      .should("not.exist");
    cy.get("[data-testid*='task-item']").contains("Task 1").should("exist");
    cy.get("[data-testid*='task-item']").contains("Task 2").should("exist");
  });

  it("Should delete the task if it's completed", () => {
    cy.createTask("To be deleted", "Notes");
    cy.completeTask("To be deleted");
    cy.deleteTask("To be deleted");
    cy.get("[data-testid*='task-item']").should("not.exist");
  });

  it("Should delete all the completed tasks with the delete all button", () => {
    cy.createTask("Completed 1", "Notes");
    cy.createTask("Completed 2", "");
    cy.createTask("Task 3", "");
    cy.createTask("Completed 4", "Notes");
    cy.createTask("Task 5", "Notes");

    cy.completeTask("Completed 1");
    cy.completeTask("Completed 2");
    cy.completeTask("Completed 4");

    cy.deleteCompletedTasks();
    cy.get("[data-testid='task-item-Completed 1']").should("not.exist");
    cy.get("[data-testid='task-item-Completed 2']").should("not.exist");
    cy.get("[data-testid='task-item-Completed 4']").should("not.exist");

    cy.get("[data-testid='task-item-Task 3']").should("exist");
    cy.get("[data-testid='task-item-Task 5']").should("exist");
  });
});
