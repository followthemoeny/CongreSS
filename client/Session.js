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
      .catch((err) => {
        value(Session.ADDRESS, null);
        return Promise.reject(err);
      });
  },

  getOfficals() {
    const officials = value(Session.OFFICIALS);

    if (officials) {
      return Promise.resolve(officials);
    }

    return httpGet('/api/officials', { address: Session.address })
      .then((data) => value(Session.OFFICIALS, data));
  },

  getElections() {
    const elections = value(Session.ELECTIONS);

    if (elections) {
      return Promise.resolve(elections); 
    }

    return httpGet('/api/election', { address: Session.address })
      .then((data) => value(Session.ELECTIONS, Array.isArray(data) ? data : [data])); //fix server
  },

  getFinances(name, state) {
    const finances = value(Session.FINANCES);

    const key = `${name}:${state}`;

    if (finances[key]) {
      return Promise.resolve(finances[key]);
    }

    return httpGet('/api/candidate', { name, state })
      .then((data) => {
        finances[key] = data;
        value(Session.FINANCES, finances);
        return data;
      });
  }
};

export default Session;