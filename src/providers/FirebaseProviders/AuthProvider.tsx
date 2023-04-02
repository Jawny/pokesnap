import { createContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { auth } from "./FirebaseSetup";
import React from "react";

interface IAuthContext {
  user: firebase.User | null;
  setUser: React.Dispatch<React.SetStateAction<firebase.User | null>>;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  const authContextValue: IAuthContext = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
