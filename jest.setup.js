const app = require('./server');
const { sequelize } = require('./models');
let server;

beforeAll(async () => {
  server = app.listen(3001); // Avoiding env PORT for simplicity in test
  await sequelize.sync({ force: true }); // Reset the database for clean tests
});

afterAll(async () => {
  await server.close();
  await sequelize.close(); // Close the database connection after all tests are done
});
