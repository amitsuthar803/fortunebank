import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getUserByEmail } from '../firebase/userOperations';

const BalanceContext = createContext();

export function BalanceProvider({ children }) {
  const [balance, setBalance] = useState(0);
  const { user } = useAuth();

  const fetchBalance = async () => {
    if (user?.email) {
      try {
        const userData = await getUserByEmail(user.email);
        if (userData) {
          setBalance(userData.balance || 0);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [user]);

  const updateBalance = (newBalance) => {
    setBalance(newBalance);
  };

  return (
    <BalanceContext.Provider value={{ balance, updateBalance, refreshBalance: fetchBalance }}>
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalance() {
  return useContext(BalanceContext);
}
