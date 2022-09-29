import { userName, email, password, invalidPass } from '../../user-info';

describe('Login functionalities of the app', () => {
  beforeEach(() => {
    cy.visit('https://react-redux.realworld.io/');
  });

  it('verify that the user can create an account successfully', () => {
    cy.intercept('https://api.realworld.io/api/users').as('signUp');

    cy.get('nav').find('.nav-item').last().children().click();
    cy.get('form').find('input').filter('[type="text"]').type(userName);
    cy.get('form').find('input').filter('[type="email"]').type(email);
    cy.get('form').find('input').filter('[type="password"]').type(password);
    cy.get('form').find('button').click();

    cy.wait('@signUp').its('response.statusCode').should('eq', 200);
    cy.get('.nav-item').should((item) => {
      expect(item.eq(3)).to.contain(`${userName}`);
    });
  });

  it('verify that a user cannot log in when entering a wrong email address or password', () => {
    cy.intercept('https://api.realworld.io/api/users/login').as('signIn');

    cy.get('nav').find('.nav-item').eq(1).children().click();
    cy.get('form').find('input').filter('[type="email"]').type(email);
    cy.get('form').find('input').filter('[type="password"]').type(invalidPass);
    cy.get('form').find('button').click();

    cy.wait('@signIn').its('response.statusCode').should('eq', 403);
    cy.get('.error-messages')
      .children()
      .contains('email or password is invalid');
    cy.get('h1').contains('Sign In');
  });
});
