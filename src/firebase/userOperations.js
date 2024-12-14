import { db } from "../firebase";
import { collection, query, where, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";

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
