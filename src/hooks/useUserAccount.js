import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCurrentBalance, getUserByEmail } from '../firebase/userOperations';

export function useUserAccount() {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.email) {
        try {
          const userData = await getUserByEmail(user.email);
          if (userData) {
            setBalance(userData.balance || 0);
            setTransactions(userData.transactions || []);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const refreshBalance = async () => {
    if (user?.email) {
      try {
        const newBalance = await getCurrentBalance(user.email);
        setBalance(newBalance);
      } catch (error) {
        console.error('Error refreshing balance:', error);
      }
    }
  };

  return {
    balance,
    transactions,
    loading,
    refreshBalance
  };
}
