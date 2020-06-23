const store = (key, val = undefined) => {
  if (key === null) {
    window.sessionStorage.removeItem("data");
  }
  let data = window.sessionStorage.getItem('data');
  data = data ? JSON.parse(data) : {};
  if (val !== undefined) {
    data[key] = val;
    window.sessionStorage.setItem('data', JSON.stringify(data));
  } else if (typeof key === 'object') {
    data = { ...data, ...key };
    window.sessionStorage.setItem('data', JSON.stringify(data));
    return data;
  }
  return data[key];
};

const Session = {
  ADDRESS: "address",
  OFFICIALS: "officials",
  ELECTIONS: "elections",
  CANDIDATES: "candidates",

  createSession(address) {
    store({
      [Session.ADDRESS]: address,
      [Session.OFFICIALS]: null,
      [Session.ELECTIONS]: null,
      [Session.CANDIDATES]: null
    });

    return Session.getOfficals(address)
      .then((result) => {
        store(Session.OFFICIALS, result);
      })
      .catch((err) => {
        store(Session.ADDRESS, null);
        return Promise.reject();
      });
  },

  get address() {
    return store(Session.ADDRESS);
  },

  getOfficals() {
    const address = store(Session.ADDRESS);

    return new Promise((resolve, reject) => {
      const officials = store(Session.OFFICIALS);

      if (officials) {
        return resolve(officials);
      }

      setTimeout(() => {
        if (address === 'bad') {
          return reject(404);
        }
        
        resolve(store(Session.OFFICIALS, [
          {
            name: 'Mitch McConnel'
          },
          {
            name: 'Bernie Sanders'
          }
        ]));
      }, 200);
    });
  },

  getElections() {
    const address = store(Session.ADDRESS);

    return new Promise((resolve, reject) => {
      const elections = store(Session.ELECTIONS);

      if (elections) {
        return resolve(elections);
      }

      setTimeout(() => {
        if (address === 'noelections') {
          return reject(404);
        }
        
        resolve(store(Session.ELECTIONS, [
          {
            date: '06/23/2020',
            address: 'Some Address, New York, NY 10001'
          },
        ]));
      }, 200);
    });
  },

  getCandidates() {
    const address = store(Session.ADDRESS);

    return new Promise((resolve, reject) => {
      const candidates = store(Session.CANDIDATES);

      if (candidates) {
        return resolve(candidates);
      }

      setTimeout(() => {
        if (address === 'nocandidates') {
          return reject(404);
        }
        
        resolve(store(Session.CANDIDATES, [
          {
            id: 123,
            name: 'Joe Biden'
          },
          {
            id: 456,
            name: 'Donald Trump'
          }
        ]));
      }, 200);
    });
  }
};

export default Session;