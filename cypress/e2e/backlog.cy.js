describe("Backlog functionality", () => {
  beforeEach(() => {
    cy.openWebApp();
  });

  it("Should open and close the backlog drawer", () => {
    // Initially backlog should be closed
    cy.get("[data-testid='backlog-drawer']").should("not.be.visible");

    // Open backlog
    cy.openBacklog();
    cy.get("[data-testid='backlog-drawer']").should("be.visible");

    // Close backlog using the close button in the header
    cy.closeBacklog();
    cy.get("[data-testid='backlog-drawer']").should("not.be.visible");
  });

  it("Should show empty backlog message when no tasks are in backlog", () => {
    cy.openBacklog();
    cy.get("[data-testid='backlog-empty-message']").should("exist");
    cy.get("[data-testid='backlog-content']")
      .find("[data-testid*='task-item-']")
      .should("not.exist");
  });

  it("Should show backlog badge with correct count", () => {
    // Initially no tasks, badge should not exist
    cy.get("[data-testid='backlog-badge']").should("not.exist");

    // Create a task and move it to backlog
    cy.createTask("Task for backlog", "Notes for backlog task");
    cy.dragTaskToBacklog("Task for backlog");

    // Badge should show count of 1
    cy.verifyBacklogBadgeCount(1);

    // Create another task and move it to backlog
    cy.createTask("Another backlog task", "More notes");
    cy.dragTaskToBacklog("Another backlog task");

    // Badge should show count of 2
    cy.verifyBacklogBadgeCount(2);
  });

  it("Should move task to backlog using drag and drop", () => {
    cy.createTask("Task to backlog", "Notes for backlog");

    // Initially task should not be in backlog
    cy.openBacklog();
    cy.get("[data-testid='backlog-empty-message']").should("exist");
    cy.closeBacklog();

    // Move task to backlog
    cy.dragTaskToBacklog("Task to backlog");

    // Task should now be in backlog
    cy.openBacklog();
    cy.isTaskInBacklog("Task to backlog");
    cy.closeBacklog();

    // Task should not be in any section anymore
    cy.get("[data-testid*='task-item']").should("not.be.visible");
  });

  it("Should move multiple tasks to backlog", () => {
    cy.createTask("Task 1", "Notes 1");
    cy.createTask("Task 2", "Notes 2");
    cy.createTask("Task 3", "Notes 3");

    // Move all tasks to backlog
    cy.dragTaskToBacklog("Task 1");
    cy.dragTaskToBacklog("Task 2");
    cy.dragTaskToBacklog("Task 3");

    // All tasks should be in backlog
    cy.openBacklog();
    cy.isTaskInBacklog("Task 1");
    cy.isTaskInBacklog("Task 2");
    cy.isTaskInBacklog("Task 3");

    // No tasks should be in sections
    cy.closeBacklog();
    cy.get("[data-testid*='task-item']").should("not.be.visible");
  });

  it("Should move task from backlog to a section", () => {
    cy.createTask("Task to backlog", "Notes for backlog");
    cy.dragTaskToBacklog("Task to backlog");

    // Task should be in backlog
    cy.openBacklog();
    cy.isTaskInBacklog("Task to backlog");

    // Open backlog to see the task
    cy.get("[data-testid='backlog-icon']").click();

    // Move task from backlog to a section
    cy.moveTaskFromBacklogToSection("Task to backlog", "Prima Mattina");

    // Close backlog
    cy.closeBacklog();

    // Task should be in the target section
    cy.isTaskInSection("Task to backlog", "Prima Mattina");
  });

  it("Should maintain task properties when moved to and from backlog", () => {
    cy.createTask("Important task", "Important notes", true); // Create with priority

    // Verify task has priority initially (check for priority indicator)
    cy.get("[data-testid='task-item-Important task']")
      .find("svg")
      .should("exist");

    // Move task to backlog
    cy.dragTaskToBacklog("Important task");

    cy.openBacklog();

    // Verify task still has priority in backlog
    cy.get("[data-testid='task-item-Important task']")
      .find("svg")
      .should("exist");

    // Move task back to a section
    cy.moveTaskFromBacklogToSection("Important task", "Pomeriggio");

    cy.closeBacklog();

    // Verify task still has priority in the section
    cy.get("[data-testid='task-item-Important task']")
      .find("svg")
      .should("exist");
  });

  it("Should handle completed tasks in backlog properly", () => {
    cy.createTask("Completed task", "Notes for completed task");
    cy.completeTask("Completed task");

    // Verify task is completed
    cy.isTaskCompleted("Completed task", true);

    // Move completed task to backlog
    cy.dragTaskToBacklog("Completed task");

    cy.openBacklog();

    // Verify task is still completed in backlog
    cy.get("[data-testid='task-item-Completed task']")
      .find("h3")
      .should("have.class", "line-through");

    // Move task back to a section
    cy.moveTaskFromBacklogToSection("Completed task", "Sera");

    cy.closeBacklog();

    // Verify task is still completed in the section
    cy.isTaskCompleted("Completed task", true);
  });
});
