import React, { useReducer, useEffect } from "react";

const initialState = {
  address: null
};

const reducer = (session, newSession) => {
  if (newSession === null) {
    localStorage.removeItem("session");
    return initialState;
  }
  return { ...session, ...newSession };
};

const localState = JSON.parse(localStorage.getItem("session"));

const SessionContext = React.createContext();

function SessionProvider(props) {
  const [session, setSession] = useReducer(reducer, localState || initialState);

  useEffect(() => {
    localStorage.setItem("session", JSON.stringify(session));
  }, [session]);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {props.children}
    </SessionContext.Provider>
  );
}

export { SessionContext, SessionProvider };