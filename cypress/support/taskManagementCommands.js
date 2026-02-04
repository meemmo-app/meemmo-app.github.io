Cypress.Commands.add("createTask", (title, note = "", priority = false) => {
  const newTaskModal = "[data-testid='new-task-modal']";
  cy.get("body").type(" "); // keyboard shortcut for "space"
  cy.get(newTaskModal).should("exist");
  cy.get("[data-testid='new-task-title']").type(title);
  if (note && note !== "") {
    cy.get("[data-testid='new-task-note']").type(note);
  }
  if (priority) {
    cy.get("[data-testid='new-task-priority']").click();
  }
  cy.get(newTaskModal).type("{enter}");
});

Cypress.Commands.add(
  "createTaskInSection",
  (title, note = "", priority = false, sectionLabel) => {
    const newTaskModal = "[data-testid='new-task-modal']";
    cy.get(`[data-testid='section-${sectionLabel}']`)
      .find("[data-testid='create-new-task-button']")
      .click();
    cy.get(newTaskModal).should("exist");
    cy.get("[data-testid='new-task-title']").type(title);
    if (note && note !== "") {
      cy.get("[data-testid='new-task-note']").type(note);
    }
    if (priority) {
      cy.get("[data-testid='new-task-priority']").click();
    }
    cy.get(newTaskModal).type("{enter}");
  },
);

Cypress.Commands.add("deleteTask", (title) => {
  const taskItem = "[data-testid='task-item-" + title + "']";
  cy.get(taskItem).rightclick();
  cy.get(taskItem).within(() => {
    cy.get("[data-testid='task-item-delete-button']").click();
  });
  cy.confirmModal();
});

Cypress.Commands.add("deleteCompletedTasks", () => {
  cy.get("[title*='Delete completed tasks']").click();
  cy.confirmModal();
});

Cypress.Commands.add("completeTask", (title) => {
  const taskItem = "[data-testid='task-item-" + title + "']";
  cy.get(taskItem).within(() => {
    cy.get("[data-testid='task-item-complete-toggle']").click();
  });
});

Cypress.Commands.add("showCompletedTasks", () => {
  cy.get("[title*='Show completed tasks']").click();
});

Cypress.Commands.add("hideCompletedTasks", () => {
  cy.get("[title*='Hide completed tasks']").click();
});

Cypress.Commands.add("isTaskCompleted", (title, completed) => {
  const taskItem = "[data-testid='task-item-" + title + "']";
  if (completed) {
    cy.get(taskItem).find("h3").should("have.class", "line-through");
  } else {
    cy.get(taskItem).find("h3").should("not.have.class", "line-through");
  }
});

Cypress.Commands.add("dragTaskToSection", (title, targetSectionLabel) => {
  const taskItem = `[data-testid='task-item-${title}']`;
  const targetSection = `[data-testid='section-${targetSectionLabel}']`;

  // Utilizziamo dataTransfer perché molti listener si aspettano l'oggetto evento completo
  const dataTransfer = new DataTransfer();

  cy.get(taskItem).first().trigger("dragstart", { dataTransfer });

  cy.get(targetSection)
    .trigger("dragover", { dataTransfer })
    .trigger("drop", { dataTransfer });

  // Opzionale: chiudere formalmente l'azione
  cy.get(taskItem).first().trigger("dragend", { force: true });
});

Cypress.Commands.add("isTaskInSection", (title, sectionLabel) => {
  const taskItem = `[data-testid='task-item-${title}']`;
  const section = `[data-testid='section-${sectionLabel}']`;

  cy.get(section).within(() => {
    cy.get(taskItem).should("exist").should("be.visible");
  });
});
