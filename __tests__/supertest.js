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
          .get('/api/officials/144 2nd ave 10003')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });

      it('response is an array of objects with minimum keys name, addess,party, position and photoURL', () => {
        return request(server)
          .get('/api/officials?address=144 2nd ave 10003')
          .expect((res) => {
            expect(Array.isArray(res.body)).toEqual(true);
            res.body.forEach((official) => {
              expect(official.hasOwnProperty('address')).toEqual(true);
              expect(official.hasOwnProperty('name')).toEqual(true);
              expect(official.hasOwnProperty('position')).toEqual(true);
              expect(official.hasOwnProperty('party')).toEqual(true);
              expect(official.hasOwnProperty('photoURL')).toEqual(true);
            });
          });
      });
    });
    describe('GET api/elections', () => {
      it('gracefully handles an unregistered or malformed address with a 400', () => {
        return request(server).get('/api/elections?address=thisaintanaddress').expect(400);
      });

      it('responds with a 200 status and a json object', () => {
        return request(server)
          .get('/api/elections?address=144 2nd ave 10003')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });
  });
});

// api/officials?address=fwfiafwia
// name address party position

// api/elections?address=fwfiafwia
