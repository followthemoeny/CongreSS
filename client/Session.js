import ex_officials from './models/officials.js';
import ex_elections from './models/election.js';

const value = (key, val = undefined) => {
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
  FINANCES: "finances",

  get address() {
    return value(Session.ADDRESS);
  },

  initialize(address) {
    value({
      [Session.ADDRESS]: address,
      [Session.OFFICIALS]: null,
      [Session.ELECTIONS]: null,
      [Session.FINANCES]: {}
    });

    return Session.getOfficals(address)
      .then((result) => {
        value(Session.OFFICIALS, result);
      })
      .catch((err) => {
        value(Session.ADDRESS, null);
        return Promise.reject();
      });
  },

  getOfficals() {
    return new Promise((resolve, reject) => {
      const officials = value(Session.OFFICIALS);

      if (officials) {
        return resolve(officials);
      }

      setTimeout(() => {
        if (Session.address === 'bad') {
          return reject(404);
        }
        
        resolve(value(Session.OFFICIALS, ex_officials.officials));
      }, 200);
    });
  },

  getElections() {
    return new Promise((resolve, reject) => {
      const elections = value(Session.ELECTIONS);

      if (elections) {
        return resolve(elections);
      }

      setTimeout(() => {
        if (Session.address === 'noelections') {
          return reject(404);
        }
        
        resolve(value(Session.ELECTIONS, ex_elections));
      }, 200);
    });
  },

  getFinances(candidate_id) {
    return new Promise((resolve, reject) => {
      const finances = value(Session.FINANCES);

      if (finances[candidate_id]) {
        return resolve(finances[candidate_id]);
      }

      setTimeout(() => {
        if (Session.address === 'nofinances') {
          return reject(404);
        }

        finances[candidate_id] = {
          expenditures: 123456789.00
        };

        value(Session.FINANCES, finances);
        
        resolve(finances[candidate_id]);
      }, 200);
    });
  }
};

export default Session;