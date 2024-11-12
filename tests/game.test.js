const request = require('supertest');
const app = require('../server');
const { sequelize, Game, Team } = require('../models');

beforeAll(async () => {
  await sequelize.sync();
  const homeTeam = await Team.create({ name: 'Home Team', division: 'Division 1' });
  const awayTeam = await Team.create({ name: 'Away Team', division: 'Division 1' });
  global.homeTeamId = homeTeam.id;
  global.awayTeamId = awayTeam.id;
});

describe('Games Routes', () => {
  let gameId;

  it('should create a new game', async () => {
    const response = await request(app).post('/api/games').send({
      date: '2024-11-20',
      location: 'Stadium',
      homeTeamId: global.homeTeamId,
      awayTeamId: global.awayTeamId,
      scoreHome: 3,
      scoreAway: 2,
    });
    expect(response.status).toBe(201);
    expect(response.body.location).toBe('Stadium');
    gameId = response.body.id;
  });

  it('should retrieve all games', async () => {
    const response = await request(app).get('/api/games');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a game by ID', async () => {
    const response = await request(app).get(`/api/games/${gameId}`);
    expect(response.status).toBe(200);
    expect(response.body.location).toBe('Stadium');
  });

  it('should update a game', async () => {
    const response = await request(app).put(`/api/games/${gameId}`).send({
      location: 'Updated Stadium',
    });
    expect(response.status).toBe(200);
    expect(response.body.location).toBe('Updated Stadium');
  });

  it('should delete a game', async () => {
    const response = await request(app).delete(`/api/games/${gameId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Game deleted');
  });
});
