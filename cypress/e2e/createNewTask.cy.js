describe("Create new task", () => {
  beforeEach(() => {
    cy.openWebApp();
  });

  it("Should create a new task using the keyboard shortcut", () => {
    const newTaskModal = "[data-testid='new-task-modal']";
    cy.get(newTaskModal).should("not.exist");
    cy.get("body").type(" "); // keyboard shortcut for "space"
    cy.get(newTaskModal).should("exist");
    cy.get("[data-testid='new-task-title']").type("Task title");
    cy.get("[data-testid='new-task-note']").type("Task notes");
    cy.get(newTaskModal).type("{enter}");
    // check if task is created
    cy.get("[data-testid*='task-item']").contains("Task title");
    cy.get("[data-testid*='task-item']").contains("Task notes");
  });

  it("Should create a new task using the button in the section", () => {
    const newTaskModal = "[data-testid='new-task-modal']";
    cy.get(newTaskModal).should("not.exist");
    cy.get("[data-testid='section-Prima Mattina']")
      .find("[data-testid='create-new-task-button']")
      .click();
    cy.get(newTaskModal).should("exist");
    cy.get("[data-testid='new-task-title']").type("Create task with button");
    cy.get("[data-testid='new-task-priority']").click();
    cy.get("[data-testid='new-task-save']").click();
    // check if task is created
    cy.get("[data-testid*='task-item']").contains("Create task with button");
    cy.isTaskInSection("Create task with button", "Prima Mattina");
  });

  it("Should create a new task using the button in every section", () => {
    cy.createTaskInSection(
      "Task for Prima Mattina",
      "",
      false,
      "Prima Mattina",
    );
    cy.isTaskInSection("Task for Prima Mattina", "Prima Mattina");

    cy.createTaskInSection(
      "Task for Tarda Mattina",
      "Notes for the task",
      false,
      "Tarda Mattina",
    );
    cy.isTaskInSection("Task for Tarda Mattina", "Tarda Mattina");

    cy.createTaskInSection(
      "Task for Pomeriggio",
      "Notest for the task",
      true,
      "Pomeriggio",
    );
    cy.isTaskInSection("Task for Pomeriggio", "Pomeriggio");

    cy.createTaskInSection("Task for Sera", "", true, "Sera");
    cy.isTaskInSection("Task for Sera", "Sera");
  });
});
