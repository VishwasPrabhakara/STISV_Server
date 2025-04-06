import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(); // Create the context

export const useUser = () => {
  return useContext(UserContext); // Hook to access the context
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
