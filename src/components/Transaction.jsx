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
            // Sort transactions by timestamp in descending order (newest first)
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
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-dark font-medium text-lg">
          {showAll ? "All Transactions" : "Recent Transactions"}
        </h3>
        <button
          onClick={() => setShowAll((show) => !show)}
          className="bg-dark text-secondary py-2 px-5 rounded-full"
        >
          View All <span className="ml-2">{">"}</span>
        </button>
      </div>
      <div>
        {displayTransactions.map((transaction, index) => (
          <div
            key={index}
            className="flex justify-between pr-3 items-center mt-3"
          >
            <div className="flex items-center gap-4">
              <div
                className={`${
                  transaction.type === "debit" ? "bg-red-300" : "bg-green-300"
                } p-4 rounded-xl`}
              >
                💵
              </div>
              <div className="flex flex-col items-start justify-center">
                <span className="font-medium">{transaction.with}</span>
                <span className="font-normal">
                  {formatDate(transaction.timestamp)} <span className="mx-1">•</span> {formatTime(transaction.timestamp)}
                </span>
              </div>
            </div>
            <div>
              <span className="font-semibold tracking-wide">
                ₹{transaction.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transaction;
