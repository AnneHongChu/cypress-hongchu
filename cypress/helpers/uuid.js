const uuid = () => Cypress._.random(0, 1e6);
const id = uuid();

export default id;
