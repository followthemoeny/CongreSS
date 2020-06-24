import { clientStore, httpGet } from './util';

const value = clientStore('data', true);

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
      .catch(() => {
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

      return httpGet('/api/officials', { address: Session.address })
        .then((data) => resolve(value(Session.OFFICIALS, data)));
    });
  },

  getElections() {
    return new Promise((resolve, reject) => {
      const elections = value(Session.ELECTIONS);

      if (elections) {
        return resolve(elections); 
      }

      return httpGet('/api/election', { address: Session.address })
        .then((data) => resolve(value(Session.ELECTIONS, Array.isArray(data) ? data : [data]))); //fix server
    }); 
  },

  getFinances(name, state) {
    return new Promise((resolve, reject) => {
      const finances = value(Session.FINANCES);

      const key = `${name}:${state}`;

      if (finances[key]) {
        return resolve(finances[key]);
      }

      console.log(name, state);

      return httpGet('/api/candidate', { name, state })
        .then((data) => {
          finances[key] = data;
          value(Session.FINANCES, finances);
          resolve(data);
        });
    });
  }
};

export default Session;