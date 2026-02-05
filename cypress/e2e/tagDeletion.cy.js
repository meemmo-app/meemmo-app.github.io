describe("Tag deletion functionality", () => {
  beforeEach(() => {
    cy.openWebApp();
  });

  it("Should delete a tag from a task when the delete button is clicked", () => {
    // Create a task with tags
    cy.createTask(
      "Task with tags",
      "This is a task with #important #work tags",
    );

    // Focus the task using keyboard shortcuts
    cy.get("body").type("j"); // Select the task
    cy.get("body").type("e"); // Edit the task

    // Verify that the task modal opens
    cy.get("[data-testid='new-task-modal']").should("exist");

    // Check that both tags are present in the task modal
    cy.get("[data-testid='new-task-modal']").within(() => {
      cy.contains("#important").should("exist");
      cy.contains("#work").should("exist");

      // Click the delete button for the "important" tag
      cy.deleteTaskTag("important");

      // Verify that the "important" tag is removed
      cy.contains("#important").should("not.exist");
      cy.contains("#work").should("exist");

      // Click the save button
      cy.get("[data-testid='new-task-save']").click();
    });

    // Re-open the task to verify the tag was actually removed
    cy.get("body").type("j"); // Select the task
    cy.get("body").type("e"); // Edit the task

    cy.get("[data-testid='new-task-modal']").within(() => {
      // Verify that only the "work" tag remains
      cy.contains("#important").should("not.exist");
      cy.contains("#work").should("exist");

      // Close the modal
      cy.get("[data-testid='modal-close']").click();
    });
  });

  it("Should delete multiple tags from a task", () => {
    // Create a task with multiple tags
    cy.createTask("Multi-tag task", "A task with #first #second #third tags");

    // Focus the task using keyboard shortcuts
    cy.get("body").type("j"); // Select the task
    cy.get("body").type("e"); // Edit the task

    // Verify that the task modal opens
    cy.get("[data-testid='new-task-modal']").should("exist");

    cy.get("[data-testid='new-task-modal']").within(() => {
      // Verify all tags are present
      cy.contains("#first").should("exist");
      cy.contains("#second").should("exist");
      cy.contains("#third").should("exist");

      // Delete the first tag
      cy.deleteTaskTag("first");
      cy.contains("#first").should("not.exist");

      // Delete the second tag
      cy.deleteTaskTag("second");
      cy.contains("#second").should("not.exist");

      // Verify only the third tag remains
      cy.contains("#third").should("exist");

      // Save the task
      cy.get("[data-testid='new-task-save']").click();
    });

    // Re-open the task to verify changes
    cy.get("body").type("j"); // Select the task
    cy.get("body").type("e"); // Edit the task

    cy.get("[data-testid='new-task-modal']").within(() => {
      // Verify that only the "third" tag remains
      cy.contains("#first").should("not.exist");
      cy.contains("#second").should("not.exist");
      cy.contains("#third").should("exist");

      // Close the modal
      cy.get("[data-testid='modal-close']").click();
    });
  });

  it("Should not crash when deleting the last tag", () => {
    // Create a task with a single tag
    cy.createTask("Single tag task", "A task with #single tag");

    // Focus the task using keyboard shortcuts
    cy.get("body").type("j"); // Select the task
    cy.get("body").type("e"); // Edit the task

    // Verify that the task modal opens
    cy.get("[data-testid='new-task-modal']").should("exist");

    cy.get("[data-testid='new-task-modal']").within(() => {
      // Verify the tag is present
      cy.contains("#single").should("exist");

      // Delete the tag
      cy.deleteTaskTag("single");
      cy.contains("#single").should("not.exist");

      // Verify the tag section disappears when no tags remain
      cy.contains("#").should("not.exist");

      // Save the task
      cy.get("[data-testid='new-task-save']").click();
    });

    // Re-open the task to verify it was saved without tags
    cy.get("body").type("j"); // Select the task
    cy.get("body").type("e"); // Edit the task

    cy.get("[data-testid='new-task-modal']").within(() => {
      // Verify no tags are present
      cy.contains("#").should("not.exist");

      // Close the modal
      cy.get("[data-testid='modal-close']").click();
    });
  });
});
