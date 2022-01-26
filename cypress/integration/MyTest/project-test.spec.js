/// <reference types="cypress" />

describe("Check SignIn/Register UI", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it.only("Check SignIn page", () => {
    // check title
    cy.contains("Sign in to your account");

    // check to register page link
    cy.contains("Create an account").click();
    // check register page title
    cy.contains("Create an account");
    cy.url().should("include", "/register");

    // check Sign in page link
    cy.contains("Sign in your account").click();
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("Register a user", () => {
    // click to register page link
    cy.contains("Create an account").click();
  });
});
