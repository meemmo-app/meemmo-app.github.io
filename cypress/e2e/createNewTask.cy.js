describe("Create new task", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.clearLocalStorage();
    cy.get("h1").should("exist").should("have.text", "MEEMMO");
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
    cy.get("[data-testid='task-item']").contains("Task title");
    cy.get("[data-testid='task-item']").contains("Task notes");
  });

  it("Should create a new task using the button", () => {
    const newTaskModal = "[data-testid='new-task-modal']";
    cy.get(newTaskModal).should("not.exist");
    cy.get("[data-testid='create-new-task-button']").click();
    cy.get(newTaskModal).should("exist");
    cy.get("[data-testid='new-task-title']").type("Create task with button");
    cy.get("[data-testid='new-task-priority']").click();
    cy.get("[data-testid='new-task-save']").click();
    // check if task is created
    cy.get("[data-testid='task-item']").contains("Create task with button");
  });
});
