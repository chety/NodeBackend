const test = require('ava');
const request = require('supertest');
const app = require('../app');

async function insertUser(user = { name: 'Chety Clooney', age: 33 }) {
  const createdUserResponse = await request(app).post('/person').send(user);
  return createdUserResponse;
}

test('Get List Of People', async (t) => {
  await insertUser();

  const peopleResponse = await request(app).get('/person/all');

  t.is(peopleResponse.statusCode, 200);
  t.true(Array.isArray(peopleResponse.body));
  t.true(peopleResponse.body.length > 0);
});

test('Create a person', async (t) => {
  t.plan(3);
  const personToCreate = { name: 'Daniel Amokachi', age: 67 };
  const createdUser = (await insertUser(personToCreate)).body;

  t.is(createdUser.status, 200);
  t.is(createdUser.name, personToCreate.name);
  t.is(createdUser.age, personToCreate.age);
});

test('Fetch a person', async (t) => {
  t.plan(2); //basically tells the ava i need 2 assertions before you make assertions
  const personToCreate = { name: 'George Hagi', age: 59 };
  const createdUser = (await insertUser(personToCreate)).body;

  const fetchedUser = await request(app).get(`/person/${createdUser.id}`);

  t.is(fetchedUser.status, 200);
  dt.deepEqual(fetchedUser.body, personToCreate);
});

test('Delete a person', async (t) => {
  const insertedUser = (await insertUser()).body;
  const deleteFetch = await request(app).delete(`/person/${insertedUser.id}`);
  t.is(deleteFetch.status, 200);
  t.is(deleteFetch.text, 'ok!');

  const fetchUser = await request(app).get(`/person/${insertedUser.id}`);
  t.is(fetchUser.status, 404);
});

test('Make friends test', async (t) => {
  const person1 = await (await insertUser({ name: 'Lionel Messi', age: 35 }))
    .body;
  const person2 = await (
    await insertUser({ name: 'Christiano Ronaldo', age: 32 })
  ).body;

  await request(app)
    .post(`/person/${person1.id}/friends`)
    .send({ targetId: person2.id });

  const updatedPerson1 = await (await request(app).get(`/person/${person1.id}`))
    .body;
  t.deepEqual(updatedPerson1.friends[0], person2);
});
