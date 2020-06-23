class Api {
  static data = {
    address: null,
    officials: null,
    elections: null
  };

  static startSession(address) {

  }
  static getOfficals(address) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (address === 'bad') {
          reject(404);
        }
        
        resolve([
          {
            name: 'Mitch McConnel'
          },
          {
            name: 'Bernie Sanders'
          }
        ]);
      }, 200);
    });
  }

  static getElections(address) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (address === 'noelections') {
          reject(404);
        }
        
        resolve([
          {
            date: '06/23/2020',
            address: 'Some Address, New York, NY 10001'
          },
        ]);
      }, 200);
    });
  }

  static getCandidates(address) {
    if (address === 'bad') {
      return [];
    }

    return [
      {
        id: 123,
        name: 'Joe Biden'
      },
      {
        id: 456,
        name: 'Donald Trump'
      }
    ]
  }
};

export default Api;