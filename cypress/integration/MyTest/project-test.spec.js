/// <reference types="cypress" />

describe("Check SignIn/Register UI", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Check SignIn page", () => {
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

    cy.get("[data-testid=display_name]").type("cccccc");
    cy.get("[data-testid=email]").type("cccccc@gmail.com");
    cy.get("[data-testid=password]").type("cccccc");
    cy.get("[data-testid=createBtn]").click();
    // redirect to sign in page
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("sign in a user, then logout", () => {
    // check title
    cy.contains("Sign in to your account");

    cy.get("[data-testid=email]").type("cccccc@gmail.com");
    cy.get("[data-testid=password]").type("cccccc");
    cy.get("[data-testid=signinBtn]").click();
    // redirect to sign in page
    cy.url().should("contains", "/dashboard");

    cy.get("[data-testid=logout]").click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});
