import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { transferMoney } from "../firebase/userOperations";
import { useBalance } from "../context/BalanceContext";
import { toast } from "react-hot-toast";

function TransferAmount() {
  const { user } = useAuth();
  const { refreshBalance } = useBalance();
  const [receiverEmail, setReceiverEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e) => {
    e.preventDefault();
    
    if (!receiverEmail || !amount) {
      toast.error("Please fill in all fields");
      return;
    }

    if (receiverEmail === user.email) {
      toast.error("You cannot transfer money to yourself");
      return;
    }

    try {
      setLoading(true);
      await transferMoney(user.email, receiverEmail, amount);
      await refreshBalance(); // Refresh the balance after successful transfer
      toast.success("Transfer successful!");
      setReceiverEmail("");
      setAmount("");
    } catch (error) {
      toast.error(error.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full">
      <h3 className="text-dark font-medium text-lg">Transfer Money</h3>

      <div>
        <form onSubmit={handleTransfer} className="flex flex-col gap-3">
          <div className="flex mt-2 flex-col">
            <label htmlFor="email">Recipient's Email</label>
            <input
              id="email"
              placeholder="john@example.com"
              className="mt-1 rounded-full border-2 text-stone-500 border-gray bg-btn px-4 py-2"
              type="email"
              value={receiverEmail}
              onChange={(e) => setReceiverEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="flex mt-2 flex-col">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              placeholder="5000"
              className="mt-1 rounded-full border-2 text-stone-500 border-gray bg-btn px-4 py-2"
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`mt-2 rounded-full font-medium bg-dark text-lg text-secondary py-3 ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'
            }`}
          >
            {loading ? "Processing..." : "Transfer"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TransferAmount;
