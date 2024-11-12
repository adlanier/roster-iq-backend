const request = require('supertest');
const app = require('../server');
const { sequelize, Statistic, Player, Game, Team } = require('../models');

beforeAll(async () => {
  await sequelize.sync();
  const team = await Team.create({ name: 'Team C', division: 'Division 3' });
  const player = await Player.create({ name: 'Player 2', teamId: team.id });
  const game = await Game.create({
    date: '2024-11-20',
    location: 'Arena',
    homeTeamId: team.id,
    awayTeamId: team.id,
  });
  global.playerId = player.id;
  global.gameId = game.id;
});

describe('Statistics Routes', () => {
  let statisticId;

  it('should create a new statistic', async () => {
    const response = await request(app).post('/api/statistics').send({
      gameId: global.gameId,
      playerId: global.playerId,
      points: 20,
      assists: 5,
      rebounds: 10,
    });
    expect(response.status).toBe(201);
    expect(response.body.points).toBe(20);
    statisticId = response.body.id;
  });

  it('should retrieve all statistics', async () => {
    const response = await request(app).get('/api/statistics');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a statistic by game ID and player ID', async () => {
    const response = await request(app).get(`/api/statistics/${global.gameId}/${global.playerId}`);
    expect(response.status).toBe(200);
    expect(response.body.points).toBe(20);
  });

  it('should update a statistic', async () => {
    const response = await request(app).put(`/api/statistics/${statisticId}`).send({
      points: 25,
    });
    expect(response.status).toBe(200);
    expect(response.body.points).toBe(25);
  });

  it('should delete a statistic', async () => {
    const response = await request(app).delete(`/api/statistics/${statisticId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Statistic deleted');
  });
});
