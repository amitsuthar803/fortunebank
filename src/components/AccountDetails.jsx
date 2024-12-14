import React from "react";
import { formatDateWithYear, formatTime } from "../utils/dateUtils";
import { useCurrentTime } from "../hooks/useCurrentTime";
import { useAuth } from "../context/AuthContext";
import { useBalance } from "../context/BalanceContext";

function AccountDetails() {
  const currentTime = useCurrentTime();
  const { user } = useAuth();
  const { balance } = useBalance();

  const formatBalance = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="flex justify-between items-start rounded-[35px] py-6 px-5 bg-primary border-2 border-gray w-full">
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">Welcome, {user?.displayName}</h2>
        <span className="text-primarylight font-semibold">
          {formatDateWithYear(new Date())}
        </span>
        <span className="text-primarylight capitalize font-semibold">
          {formatTime(currentTime)}
        </span>
      </div>
      <div>
        <h2 className="font-semibold text-lg">Current Balance</h2>
        <span className="text-dark font-bold text-xl">₹{formatBalance(balance)}</span>
      </div>
    </div>
  );
}

export default AccountDetails;
