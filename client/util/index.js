import * as fetch from 'node-fetch';
import * as querystring from 'querystring';

export const access = (value) => {
  const context = { value };
  const proxy = new Proxy(function(){}, {
    get(target, prop) {
      if (context.value) {
        context.value = context.value[prop];
      }
      return proxy;
    },
    apply(target, thisArg, [defaultVal]) {
      console.log("def", defaultVal);
      if (context.value === undefined) {
        return defaultVal;
      }
      return context.value;
    }
  });
  return proxy;
};

export const clientStore = (name, session) => {
  const store = session ? window.sessionStorage : window.localStorage;
  return (key, val = undefined) => {
    let result;
  
    if (key === null) {
      store.removeItem(name);
      return;
    }
  
    let data = JSON.parse(store.getItem(name) || '{}');
  
    if (typeof key === 'object') {
      result = data = { ...data, ...key };
    }
  
    if (val !== undefined) {
      data[key] = val;
    }
  
    store.setItem(name, JSON.stringify(data));
  
    return result || data[key];
  };
};

export const httpGet = (uri, query) => {
  return fetch(`${uri}?${querystring.encode(query)}`)
    .then((response) => response.status === 200 ? response.json() : Promise.reject(response.status));
};