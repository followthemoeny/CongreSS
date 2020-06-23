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

const Api = {
  ADDRESS: "address",
  OFFICIALS: "officials",
  ELECTIONS: "elections",
  CANDIDATES: "candidates",

  createSession(address) {
    store({
      [Api.ADDRESS]: address,
      [Api.OFFICIALS]: null,
      [Api.ELECTIONS]: null,
      [Api.CANDIDATES]: null
    });

    return Api.getOfficals(address)
      .then((result) => {
        store(Api.OFFICIALS, result);
      })
      .catch((err) => {
        store(Api.ADDRESS, null);
        return Promise.reject();
      });
  },

  getAddress() {
    return store(Api.ADDRESS);
  },

  getOfficals() {
    const address = store(Api.ADDRESS);

    return new Promise((resolve, reject) => {
      const officials = store(Api.OFFICIALS);

      if (officials) {
        return resolve(officials);
      }

      setTimeout(() => {
        if (address === 'bad') {
          return reject(404);
        }
        
        resolve(store(Api.OFFICIALS, [
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
    const address = store(Api.ADDRESS);

    return new Promise((resolve, reject) => {
      const elections = store(Api.ELECTIONS);

      if (elections) {
        return resolve(elections);
      }

      setTimeout(() => {
        if (address === 'noelections') {
          return reject(404);
        }
        
        resolve(store(Api.ELECTIONS, [
          {
            date: '06/23/2020',
            address: 'Some Address, New York, NY 10001'
          },
        ]));
      }, 200);
    });
  },

  getCandidates() {
    const address = store(Api.ADDRESS);

    return new Promise((resolve, reject) => {
      const candidates = store(Api.CANDIDATES);

      if (candidates) {
        return resolve(candidates);
      }

      setTimeout(() => {
        if (address === 'nocandidates') {
          return reject(404);
        }
        
        resolve(store(Api.CANDIDATES, [
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

export default Api;