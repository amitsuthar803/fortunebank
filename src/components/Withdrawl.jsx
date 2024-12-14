import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useBalance } from "../context/BalanceContext";
import { withdrawMoney } from "../firebase/userOperations";
import { toast } from "react-hot-toast";

function Withdrawl() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { refreshBalance } = useBalance();

  const handleWithdrawal = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      await withdrawMoney(user.email, amount);
      await refreshBalance(); // Refresh the balance after successful withdrawal
      toast.success("Withdrawal successful!");
      setAmount("");
    } catch (error) {
      toast.error(error.message || "Failed to withdraw money");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full">
      <h3 className="text-dark font-medium text-lg">Withdraw Money</h3>

      <div className="mt-4">
        <form onSubmit={handleWithdrawal} className="flex flex-col gap-3">
          <div className="flex mt-2 flex-col">
            <label htmlFor="amount" className="text-dark font-medium mb-1">Amount to Withdraw</label>
            <input
              id="amount"
              placeholder="Enter amount (e.g., 5000)"
              className="rounded-full border-2 text-stone-500 border-gray bg-btn px-4 py-2"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              required
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className={`mt-4 rounded-full font-medium bg-dark text-lg text-secondary py-3 ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'
            }`}
          >
            {loading ? "Processing..." : "Withdraw"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Withdrawl;
