const request = require('supertest');
const app = require('../server');
const { sequelize, Player, Team } = require('../models');

beforeAll(async () => {
  await sequelize.sync();
  const team = await Team.create({ name: 'Team B', division: 'Division 2' });
  global.teamId = team.id;
});

describe('Players Routes', () => {
  let playerId;

  it('should create a new player', async () => {
    const response = await request(app).post('/api/players').send({
      name: 'Player 1',
      position: 'Forward',
      jerseyNumber: 10,
      teamId: global.teamId,
    });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Player 1');
    playerId = response.body.id;
  });

  it('should retrieve all players', async () => {
    const response = await request(app).get('/api/players');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a player by ID', async () => {
    const response = await request(app).get(`/api/players/${playerId}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Player 1');
  });

  it('should update a player', async () => {
    const response = await request(app).put(`/api/players/${playerId}`).send({
      name: 'Updated Player 1',
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Player 1');
  });

  it('should delete a player', async () => {
    const response = await request(app).delete(`/api/players/${playerId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Player deleted');
  });
});
