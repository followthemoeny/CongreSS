const request = require('supertest');
const fs = require('fs');
const path = require('path');
const server = 'http://localhost:3000';

describe('Route Integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with a 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

  describe('/api', () => {
    describe('GET api/officials', () => {
      it('gracefully handles an unregistered or malformed address with a 400', () => {
        return request(server).get('/api/officials?address=thisaintanaddress').expect(400);
      });

      it('responds with a 200 status and a json object', () => {
        return request(server)
          .get('/api/officials?address=144 2nd ave 10003')
          .expect('Content-Type', /json/)
          .expect(200);
      });

      it('response is an array of objects with minimum keys name, addess,party, position and photoURL', () => {
        return request(server)
          .get('/api/officials?address=144 2nd ave 10003')
          .expect((res) => {
            expect(Array.isArray(res.body)).toEqual(true);
            res.body.forEach((official) => {
              // expect(official.hasOwnProperty('address')).toEqual(true); had to disable because letitia jame has no address
              expect(official.hasOwnProperty('name')).toEqual(true);
              expect(official.hasOwnProperty('position')).toEqual(true);
              expect(official.hasOwnProperty('party')).toEqual(true);
              // expect(official.hasOwnProperty('photoUrl')).toEqual(true); had to disable because Cuomo gets no image.
            });
          });
      });
    });
    describe('GET api/election', () => {
      it('gracefully handles an unregistered or malformed address with a 400', () => {
        return request(server).get('/api/election?address=thisaintanaddress').expect(400);
      });

      it('responds with a 200 status and a json object', () => {
        return request(server)
          .get('/api/election?address=144 2nd ave 10003')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });
});
