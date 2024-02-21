const db = require('./database')

// Exécute une fonction avant l'exécution de tous les tests de ce fichier. Si la fonction retourne une promesse ou est un générateur, Jest attend que cette promesse soit résolue avant d'exécuter des tests.
beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

test('create person', async () => {
  expect.assertions(1);
  const person = await db.Person.create({
      id: 1,
      firstName: 'Bobbie',
      lastName: 'Draper'
  });
  expect(person.id).toEqual(1);
});

test('get person', async () => {
  expect.assertions(2);
  const person = await db.Person.findByPk(1);
  expect(person.firstName).toEqual('Bobbie');
  expect(person.lastName).toEqual('Draper');
});

test('delete person', async () => {
  expect.assertions(1);
  await db.Person.destroy({
      where: {
          id: 1
      }
  });
  const person = await db.Person.findByPk(1);
  expect(person).toBeNull();
});

afterAll(async () => {
  await db.sequelize.close();
});