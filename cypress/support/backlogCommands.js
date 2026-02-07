// Backlog-specific custom commands

Cypress.Commands.add("openBacklog", () => {
  cy.get("[data-testid='backlog-icon']").click();
});

Cypress.Commands.add("closeBacklog", () => {
  cy.get("[data-testid='backlog-header-close-button']").click(); // Assuming the close button is in the header
});

Cypress.Commands.add("isBacklogOpen", () => {
  cy.get("[data-testid='backlog-drawer']").should("be.visible");
});

Cypress.Commands.add("isBacklogClosed", () => {
  cy.get("[data-testid='backlog-drawer']").should("not.be.visible");
});

Cypress.Commands.add("dragTaskToBacklog", (title) => {
  const taskItem = `[data-testid='task-item-${title}']`;
  const backlogIcon = "[data-testid='backlog-icon']";

  const dataTransfer = new DataTransfer();

  // Start the drag operation
  cy.get(taskItem).first().trigger("dragstart", { dataTransfer });

  // Trigger dragover on the backlog icon
  cy.get(backlogIcon).trigger("dragover", { dataTransfer });

  // Drop the task onto the backlog icon
  cy.get(backlogIcon).trigger("drop", { dataTransfer });

  // End the drag operation
  //cy.get(taskItem).first().trigger("dragend", { dataTransfer });
});

Cypress.Commands.add("moveTaskFromBacklogToSection", (title, sectionLabel) => {
  const taskItem = `[data-testid='task-item-${title}']`;
  const targetSection = `[data-testid='section-${sectionLabel}']`;

  const dataTransfer = new DataTransfer();

  // Start the drag operation
  cy.get(taskItem).first().trigger("dragstart", { dataTransfer });

  // Trigger dragover on the target section
  cy.get(targetSection).trigger("dragover", { dataTransfer });

  // Drop the task onto the target section
  cy.get(targetSection).trigger("drop", { dataTransfer });

  // End the drag operation
  //cy.get(taskItem).first().trigger("dragend", { dataTransfer });
});

Cypress.Commands.add("isTaskInBacklog", (title) => {
  const taskItem = `[data-testid='task-item-${title}']`;
  cy.get("[data-testid='backlog-tasks-container']")
    .find(taskItem)
    .should("exist");
});

Cypress.Commands.add("isTaskNotInBacklog", (title) => {
  const taskItem = `[data-testid='task-item-${title}']`;
  cy.get("[data-testid='backlog-tasks-container']")
    .find(taskItem)
    .should("not.exist");
});

Cypress.Commands.add("getBacklogTaskCount", () => {
  return cy
    .get("[data-testid='backlog-tasks-container']")
    .find("[data-testid^='task-item-']")
    .then(($tasks) => {
      return $tasks.length;
    });
});

Cypress.Commands.add("verifyBacklogBadgeCount", (expectedCount) => {
  if (expectedCount > 0) {
    cy.get("[data-testid='backlog-badge']")
      .should("exist")
      .and("contain", expectedCount);
  } else {
    cy.get("[data-testid='backlog-badge']").should("not.exist");
  }
});
