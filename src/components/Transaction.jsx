import React, { useState } from "react";

function Transaction() {
  const [showAll, setShowAll] = useState(false);

  const transactions = [
    {
      username: "sonu",
      date: Date.now(),
      amount: 5000,
      type: "debit",
    },
    {
      username: "hitesh suthar",
      date: Date.now(),
      amount: 25000,
      type: "credit",
    },
    {
      username: "lochan suthar",
      date: Date.now(),
      amount: 6000,
      type: "debit",
    },

    {
      username: "lochan suthar",
      date: Date.now(),
      amount: 2000,
      type: "credit",
    },

    {
      username: "lochan suthar",
      date: Date.now(),
      amount: 1000,
      type: "debit",
    },
    {
      username: "sonu",
      date: Date.now(),
      amount: 9000,
      type: "credit",
    },
    {
      username: "lata suthar",
      date: Date.now(),
      amount: 8000,
      type: "credit",
    },
    {
      username: "shraddha suthar",
      date: Date.now(),
      amount: 8000,
      type: "credit",
    },
  ];

  const initialCount = 3;

  const displayTransactions = showAll
    ? transactions
    : transactions.slice(0, initialCount);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-dark font-medium text-lg">
          {showAll ? "All Transactions" : "Recent Transactions"}
        </h3>
        <button
          onClick={() => setShowAll((show) => !show)}
          className=" bg-dark text-secondary py-2 px-5 rounded-full"
        >
          View All <span className=" ml-2">{">"}</span>
        </button>
      </div>
      <div>
        {/* list */}

        {displayTransactions.map((transaction, index) => (
          <div
            key={index}
            className="flex justify-between pr-3 items-center mt-3"
          >
            <div className="flex items-center gap-4 ">
              {/* credit/debit img */}
              <div
                className={`${
                  transaction.type === "debit" ? "bg-red-300" : "bg-green-300"
                }  p-4 rounded-xl`}
              >
                💵
              </div>
              {/* data */}
              <div className="flex flex-col items-start justify-center">
                <span className="font-medium">{transaction.username}</span>
                <span className=" font-normal">
                  25 Aug <span className="mx-1">•</span> 10:00 AM
                </span>
              </div>
            </div>
            {/* amount */}
            <div>
              <span className=" font-semibold tracking-wide">
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
