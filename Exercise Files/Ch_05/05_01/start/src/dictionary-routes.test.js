import dictionaryRoutes from './dictionary-routes';
import request from 'supertest';
import express from 'express';

jest.mock('../data/skiTerms.json', () => [
  { term: 'aaa', defined: 'test a' },
  { term: 'bbb', defined: 'test b' },
  { term: 'ccc', defined: 'test c' },
]);

const app = express();
app.use('/dictionary', dictionaryRoutes);

describe('dictionary-routes', () => {
  it('GET /dictionary - success', async () => {
    const { body } = await request(app).get('/dictionary');
    expect(body).toEqual([
      { term: 'aaa', defined: 'test a' },
      { term: 'bbb', defined: 'test b' },
      { term: 'ccc', defined: 'test c' },
    ]);
  });

  it('DELETE /dictionary', async () => {
    const { body } = await request(app).delete('/dictionary/bbb');
    expect(body).toEqual({
      status: 'success',
      removed: 'bbb',
      newLength: 2,
    });
  });
});
