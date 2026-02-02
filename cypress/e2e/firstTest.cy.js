describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");
    cy.get("h1").should("exist").should("have.text", "MEEMMO");
  });
});
