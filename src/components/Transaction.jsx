import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserByEmail } from "../firebase/userOperations";

function Transaction() {
  const [showAll, setShowAll] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (user?.email) {
        try {
          const userData = await getUserByEmail(user.email);
          if (userData?.transactions) {
            const sortedTransactions = [...userData.transactions].sort((a, b) => 
              new Date(b.timestamp) - new Date(a.timestamp)
            );
            setTransactions(sortedTransactions);
          }
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      }
    };

    fetchTransactions();
  }, [user]);

  const initialCount = 3;

  const displayTransactions = showAll
    ? transactions
    : transactions.slice(0, initialCount);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day} ${month}`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'withdrawal':
        return '🏧';
      case 'transfer':
        return '💵';
      default:
        return '💵';
    }
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center">
        <h3 className="text-dark font-medium text-lg">
          {showAll ? "All Transactions" : "Recent Transactions"}
        </h3>
        {transactions.length > initialCount && (
          <button
            onClick={() => setShowAll((show) => !show)}
            className="bg-dark text-secondary py-2 px-5 rounded-full hover:bg-opacity-90"
          >
            {showAll ? "Show Less" : "View All"} <span className="ml-2">{">"}</span>
          </button>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {displayTransactions.map((transaction, index) => (
          <div
            key={index}
            className="flex justify-between pr-3 items-center  rounded-xl p-4 border-2 border-gray"
          >
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-xl ${
                transaction.type === 'withdrawal' || transaction.type === 'debit' ? 'bg-red-100' :
                transaction.type === 'transfer' && transaction.with !== user.email ? 'bg-red-100' : 'bg-green-100'
              }`}>
                {getTransactionIcon(transaction.type)}
              </div>
              <div className="flex flex-col items-start justify-center">
                <span className="font-medium">
                  {transaction.type === 'withdrawal' ? 'Cash Withdrawal' :
                   transaction.type === 'transfer' ? `Transfer ${transaction.with === user.email ? 'from' : 'to'} ${transaction.with}` :
                   transaction.type === 'debit' ? 'Debit' : 'Credit'}
                </span>
                <span className="text-sm text-gray-600">
                  {formatDate(transaction.timestamp)} <span className="mx-1">•</span> {formatTime(transaction.timestamp)}
                </span>
              </div>
            </div>
            <div className={`font-semibold ${
              transaction.type === 'withdrawal' || 
              transaction.type === 'debit' ||
              (transaction.type === 'transfer' && transaction.with !== user.email)
                ? 'text-red-500'
                : 'text-green-500'
            }`}>
              {transaction.type === 'withdrawal' || 
               transaction.type === 'debit' ||
               (transaction.type === 'transfer' && transaction.with !== user.email)
                ? '-' : '+'}
              ₹{formatAmount(transaction.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transaction;
