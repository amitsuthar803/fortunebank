import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useBalance } from "../context/BalanceContext";
import { requestLoan, getLoanStatus } from "../firebase/userOperations";
import toast from "react-hot-toast";

function Loan() {
  const { user } = useAuth();
  const { balance, refreshBalance } = useBalance();
  const [loanPurpose, setLoanPurpose] = useState("education");
  const [amount, setAmount] = useState("");
  const [tenure, setTenure] = useState(60); // Default 5 years
  const [emi, setEmi] = useState(18000);
  const [loading, setLoading] = useState(false);
  const [activeLoan, setActiveLoan] = useState(null);
  const [loadingLoanStatus, setLoadingLoanStatus] = useState(true);

  const tenureOptions = [
    { value: 12, label: "1 Year" },
    { value: 24, label: "2 Years" },
    { value: 36, label: "3 Years" },
    { value: 48, label: "4 Years" },
    { value: 60, label: "5 Years" }
  ];

  // Fetch active loan status
  useEffect(() => {
    const fetchLoanStatus = async () => {
      try {
        const status = await getLoanStatus(user.email);
        setActiveLoan(status);
      } catch (error) {
        console.error("Error fetching loan status:", error);
        toast.error("Failed to fetch loan status");
      } finally {
        setLoadingLoanStatus(false);
      }
    };

    fetchLoanStatus();
  }, [user.email]);

  // Calculate EMI preview as user types amount or changes tenure
  const calculateEMI = (loanAmount, termMonths) => {
    if (!loanAmount || !termMonths) return 0;
    const annualInterestRate = 0.10;
    const monthlyInterestRate = annualInterestRate / 12;
    const emiAmount = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, termMonths)) / 
                     (Math.pow(1 + monthlyInterestRate, termMonths) - 1);
    return Math.round(emiAmount);
  };

  // Update EMI when amount or tenure changes
  useEffect(() => {
    if (amount > 0) {
      setEmi(calculateEMI(parseFloat(amount), tenure));
    }
  }, [amount, tenure]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!amount) {
      toast.error("Please enter loan amount");
      return;
    }

    const loanAmount = parseFloat(amount);
    const maxLoanAmount = balance * 0.8;

    if (loanAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (loanAmount > maxLoanAmount) {
      toast.error(`Maximum loan amount allowed is ₹${maxLoanAmount.toFixed(2)}`);
      return;
    }

    try {
      setLoading(true);
      await requestLoan(user.email, loanAmount, loanPurpose, tenure);
      await refreshBalance();
      const newLoanStatus = await getLoanStatus(user.email);
      setActiveLoan(newLoanStatus);
      toast.success("Loan approved and credited to your account!");
      setAmount("");
      setEmi(18000);
    } catch (error) {
      toast.error(error.message || "Failed to process loan request");
    } finally {
      setLoading(false);
    }
  };

  if (loadingLoanStatus) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-dark">Loading loan status...</div>
      </div>
    );
  }

  if (activeLoan) {
    return (
      <div className="h-full">
        <h3 className="text-dark font-medium text-lg mb-4">Active Loan Details</h3>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="grid gap-3">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Loan Amount:</span>
              <span className="font-medium">₹{activeLoan.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Purpose:</span>
              <span className="font-medium capitalize">{activeLoan.purpose}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Monthly EMI:</span>
              <span className="font-medium">₹{Math.round(activeLoan.monthlyEMI).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Loan Term:</span>
              <span className="font-medium">
                {activeLoan.termMonths} months ({activeLoan.termMonths / 12} years)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Date Taken:</span>
              <span className="font-medium">
                {activeLoan.date?.toDate().toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              You have an active loan. New loan requests can be made after the current loan is fully repaid.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <h3 className="text-dark font-medium text-lg">Request For Loan</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex mt-2 flex-col">
          <label htmlFor="purpose" className="">
            Loan Purpose
          </label>
          <select
            name="purpose"
            className="mt-1 rounded-full border-2 text-stone-500 border-gray bg-btn px-4 py-2"
            id="purpose"
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
          >
            <option value="education">Education</option>
            <option value="personal">Personal</option>
            <option value="home">Home Loan</option>
            <option value="property">Against Property</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="request">Request Amount</label>
          <input
            id="request"
            type="number"
            min="1"
            max={balance * 0.8}
            placeholder="Enter Request Amount Here..."
            className="mt-1 rounded-full border-2 text-stone-500 border-gray bg-btn px-4 py-2"
            value={amount}
            onChange={handleAmountChange}
            required
          />
          <p className="text-sm text-gray-600 mt-1">
            Maximum amount: ₹{(balance * 0.8).toFixed(2)}
          </p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="emi">Your Monthly EMI</label>
          <input
            type="text"
            id="emi"
            disabled
            value={`₹${emi.toLocaleString()}`}
            className="mt-1 rounded-full border-2 text-stone-500 border-gray bg-btn px-4 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="tenure">Loan Tenure</label>
          <select
            id="tenure"
            className="mt-1 rounded-full border-2 text-stone-500 border-gray bg-btn px-4 py-2"
            value={tenure}
            onChange={(e) => setTenure(parseInt(e.target.value))}
          >
            {tenureOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`mt-2 rounded-full font-medium bg-dark text-lg text-secondary py-3 ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-opacity-90"
          }`}
        >
          {loading ? "Processing..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}

export default Loan;
