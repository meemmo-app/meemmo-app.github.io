describe("Change section for task", () => {
  beforeEach(() => {
    cy.openWebApp();
  });

  function changeTaskSection(title, targetSectionLabel) {
    cy.dragTaskToSection(title, targetSectionLabel);
    cy.isTaskInSection(title, targetSectionLabel);
  }

  it("Should change section of a task by drag and drop", () => {
    cy.createTask("Task 1", "Notes");

    changeTaskSection("Task 1", "Prima Mattina");
    changeTaskSection("Task 1", "Pomeriggio");
  });

  it("Should change section of multiple tasks by drag and drop", () => {
    cy.createTask("Task 1", "Notes");
    cy.createTask("Task 2");
    cy.createTask("Task 3", "Notes");

    changeTaskSection("Task 1", "Prima Mattina");
    changeTaskSection("Task 2", "Pomeriggio");
    changeTaskSection("Task 3", "Sera");
    changeTaskSection("Task 2", "Tarda Mattina");
    changeTaskSection("Task 1", "Sera");
    changeTaskSection("Task 2", "Sera");
  });

  it("Should not change section if task dragged and dropped in the same section", () => {
    cy.createTask("Task 1", "Notes");

    changeTaskSection("Task 1", "Sera");
    changeTaskSection("Task 1", "Sera");
  });
});
