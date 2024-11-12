const request = require('supertest');
const app = require('../server');
const { sequelize, Team } = require('../models');

describe('Teams Routes', () => {
  let teamId;

  it('should create a new team', async () => {
    const response = await request(app).post('/api/teams').send({
      name: 'Team A',
      division: 'Division 1',
    });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Team A');
    teamId = response.body.id;
  });

  it('should retrieve all teams', async () => {
    const response = await request(app).get('/api/teams');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a team by ID', async () => {
    const response = await request(app).get(`/api/teams/${teamId}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Team A');
  });

  it('should update a team', async () => {
    const response = await request(app).put(`/api/teams/${teamId}`).send({
      name: 'Updated Team A',
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Team A');
  });

  it('should delete a team', async () => {
    const response = await request(app).delete(`/api/teams/${teamId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Team deleted');
  });
});
