import { db } from "../firebase";
import { collection, query, where, getDocs, doc, updateDoc, getDoc, serverTimestamp, addDoc } from "firebase/firestore";

// Get user by email
export const getUserByEmail = async (email) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    return {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data()
    };
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

// Transfer money between users
export const transferMoney = async (senderEmail, receiverEmail, amount) => {
  try {
    // Convert amount to number
    const transferAmount = Number(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      throw new Error("Invalid amount");
    }

    // Get sender and receiver details
    const sender = await getUserByEmail(senderEmail);
    const receiver = await getUserByEmail(receiverEmail);

    if (!sender || !receiver) {
      throw new Error("User not found");
    }

    if (sender.balance < transferAmount) {
      throw new Error("Insufficient balance");
    }

    // Update sender's balance
    const senderRef = doc(db, "users", sender.id);
    await updateDoc(senderRef, {
      balance: sender.balance - transferAmount,
      transactions: [...(sender.transactions || []), {
        type: "debit",
        amount: transferAmount,
        with: receiver.email,
        timestamp: new Date().toISOString()
      }]
    });

    // Update receiver's balance
    const receiverRef = doc(db, "users", receiver.id);
    await updateDoc(receiverRef, {
      balance: receiver.balance + transferAmount,
      transactions: [...(receiver.transactions || []), {
        type: "credit",
        amount: transferAmount,
        with: sender.email,
        timestamp: new Date().toISOString()
      }]
    });

    return {
      success: true,
      message: "Transfer successful"
    };
  } catch (error) {
    console.error("Error in transfer:", error);
    throw error;
  }
};

// Get user's current balance
export const getCurrentBalance = async (email) => {
  try {
    const user = await getUserByEmail(email);
    return user ? user.balance : 0;
  } catch (error) {
    console.error("Error getting balance:", error);
    throw error;
  }
};

// Request loan
export const requestLoan = async (userEmail, loanAmount, loanPurpose, loanTermMonths) => {
  try {
    // First get the user document using email query
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", userEmail));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error("User not found");
    }

    const userDoc = querySnapshot.docs[0];
    const userRef = doc(db, "users", userDoc.id);
    const userData = userDoc.data();
    
    const currentBalance = userData.balance || 0;
    const maxLoanAmount = currentBalance * 0.8;

    if (loanAmount > maxLoanAmount) {
      throw new Error(`Maximum loan amount allowed is ₹${maxLoanAmount.toFixed(2)}`);
    }

    const newBalance = currentBalance + parseFloat(loanAmount);
    const timestamp = serverTimestamp();

    // Calculate EMI with dynamic loan term and 10% annual interest
    const annualInterestRate = 0.10;
    const monthlyInterestRate = annualInterestRate / 12;
    const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) / 
                (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);

    await updateDoc(userRef, {
      balance: newBalance,
      hasActiveLoan: true,
      loanAmount: parseFloat(loanAmount),
      loanPurpose: loanPurpose,
      loanDate: timestamp,
      monthlyEMI: emi,
      loanTermMonths: loanTermMonths
    });

    // Add loan transaction to history
    const transactionRef = collection(db, "transactions");
    await addDoc(transactionRef, {
      senderEmail: "BANK",
      receiverEmail: userEmail,
      amount: parseFloat(loanAmount),
      type: "LOAN",
      purpose: loanPurpose,
      termMonths: loanTermMonths,
      timestamp: timestamp,
    });

    return {
      newBalance,
      monthlyEMI: emi
    };
  } catch (error) {
    throw error;
  }
};

// Get user's loan status
export const getLoanStatus = async (userEmail) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", userEmail));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error("User not found");
    }

    const userData = querySnapshot.docs[0].data();
    if (!userData.hasActiveLoan) {
      return null;
    }

    return {
      amount: userData.loanAmount,
      purpose: userData.loanPurpose,
      date: userData.loanDate,
      monthlyEMI: userData.monthlyEMI,
      termMonths: userData.loanTermMonths
    };
  } catch (error) {
    console.error("Error getting loan status:", error);
    throw error;
  }
};
