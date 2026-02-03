describe("Navigate sections", () => {
  beforeEach(() => {
    cy.openWebApp();
  });

  it("Section should be active if clicked", () => {
    cy.selectSection("Prima Mattina");
    cy.isSectionFocused("Prima Mattina");

    cy.selectSection("Sera");
    cy.isSectionFocused("Sera");
  });

  it("Section should be active if reached with keyboard shortcut H / L", () => {
    cy.selectSection("Prima Mattina");
    cy.isSectionFocused("Prima Mattina");

    cy.get("body").type("l");
    cy.isSectionFocused("Tarda Mattina");
    cy.get("body").type("l");
    cy.get("body").type("l");
    cy.isSectionFocused("Sera");
    cy.get("body").type("l");
    cy.isSectionFocused("Prima Mattina");

    cy.get("body").type("h");
    cy.isSectionFocused("Sera");
    cy.get("body").type("h");
    cy.get("body").type("h");
    cy.get("body").type("h");
    cy.isSectionFocused("Prima Mattina");
  });

  it("Section should be active if reached with keyboard left and right arrows", () => {
    cy.selectSection("Prima Mattina");
    cy.isSectionFocused("Prima Mattina");

    cy.get("body").type("{rightArrow}");
    cy.isSectionFocused("Tarda Mattina");
    cy.get("body").type("{rightArrow}");
    cy.get("body").type("{rightArrow}");
    cy.isSectionFocused("Sera");
    cy.get("body").type("{rightArrow}");
    cy.isSectionFocused("Prima Mattina");

    cy.get("body").type("{leftArrow}");
    cy.isSectionFocused("Sera");
    cy.get("body").type("{leftArrow}");
    cy.get("body").type("{leftArrow}");
    cy.get("body").type("{leftArrow}");
    cy.isSectionFocused("Prima Mattina");
  });
});

describe("Navigate tasks in a section", () => {
  beforeEach(() => {
    cy.openWebApp();
  });

  it("Task should be active if reached with keyboard shortcut J / K", () => {
    cy.selectSection("Prima Mattina");
    cy.isSectionFocused("Prima Mattina");
    cy.createTask("Task 1", "");
    cy.createTask("Task 2", "");
    cy.createTask("Task 3", "");

    cy.get("body").type("j");
    cy.get("body").type("d"); // should complete the focused task
    cy.isTaskCompleted("Task 1", true); // check that the focused task reached with keyboard shortcut is completed
    cy.get("body").type("j");
    cy.get("body").type("d"); // should complete the focused task
    cy.isTaskCompleted("Task 2", true); // check that the focused task reached with keyboard shortcut is completed
    cy.get("body").type("j");
    cy.get("body").type("d"); // should complete the focused task
    cy.isTaskCompleted("Task 3", true); // check that the focused task reached with keyboard shortcut is completed

    cy.get("body").type("k");
    cy.get("body").type("d"); // should complete the focused task
    cy.isTaskCompleted("Task 2", false); // check that the focused task reached with keyboard shortcut is completed
    cy.get("body").type("k");
    cy.get("body").type("d"); // should complete the focused task
    cy.isTaskCompleted("Task 1", false); // check that the focused task reached with keyboard shortcut is completed
    cy.get("body").type("k");
    cy.get("body").type("d"); // should complete the focused task
    cy.isTaskCompleted("Task 3", false); // check that the focused task reached with keyboard shortcut is completed
  });

  it("Task should be active if reached with keyboard up and down arrows", () => {
    cy.selectSection("Prima Mattina");
    cy.isSectionFocused("Prima Mattina");
    cy.createTask("Task 1", "");
    cy.createTask("Task 2", "");
    cy.createTask("Task 3", "");

    cy.get("body").type("{downArrow}");
    cy.get("body").type("d"); // should complete the focused task
    cy.isTaskCompleted("Task 1", true); // check that the focused task reached with keyboard shortcut is completed
    cy.get("body").type("{downArrow}");
    cy.get("body").type("d"); // should complete the focused task
    cy.isTaskCompleted("Task 2", true); // check that the focused task reached with keyboard shortcut is completed
    cy.get("body").type("{downArrow}");
    cy.get("body").type("d"); // should complete the focused task
    cy.isTaskCompleted("Task 3", true); // check that the focused task reached with keyboard shortcut is completed

    cy.get("body").type("{upArrow}");
    cy.get("body").type("d"); // should complete the focused task
    cy.isTaskCompleted("Task 2", false); // check that the focused task reached with keyboard shortcut is completed
    cy.get("body").type("{upArrow}");
    cy.get("body").type("d"); // should complete the focused task
    cy.isTaskCompleted("Task 1", false); // check that the focused task reached with keyboard shortcut is completed
    cy.get("body").type("{upArrow}");
    cy.get("body").type("d"); // should complete the focused task
    cy.isTaskCompleted("Task 3", false); // check that the focused task reached with keyboard shortcut is completed
  });
});
