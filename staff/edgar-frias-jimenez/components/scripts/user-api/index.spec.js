'use strict';

describe('user api', () => {
  describe('register user', () => {
    it('should succeed on correct user query', done => {
      const name = 'n';
      const surname = 's';
      const username = 'u';
      const password = 'p';

      userApi.create(name, surname, username, password, function(response) {
        expect(response).toBeDefined();

        const { status, data: {id} } = response;

        expect(status).toBe('OK');
        expect(typeof id).toBe('string');
        // expect(id.length)

        done;
      });
    });
  });
});