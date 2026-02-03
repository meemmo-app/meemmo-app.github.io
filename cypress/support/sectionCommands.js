Cypress.Commands.add("selectSection", (sectionLabel) => {
  const section = `[data-testid='section-${sectionLabel}']`;
  cy.get(section).click();
});

Cypress.Commands.add("isSectionFocused", (sectionLabel) => {
  const section = `[data-testid='section-${sectionLabel}']`;
  cy.get(section)
    .should("be.visible")
    .should("have.css", "border-color")
    .and("not.match", /0, 0, 0, 0/);
});

Cypress.Commands.add("isTaskFocused", (sectionLabel) => {
  const section = `[data-testid='section-${sectionLabel}']`;
  cy.get(section)
    .should("be.visible")
    .should("have.css", "border-color")
    .and("not.match", /0, 0, 0, 0/);
});
