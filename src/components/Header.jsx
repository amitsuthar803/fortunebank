import React from "react";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="h-20 px-6 rounded-[30px] bg-dark mt-4 justify-between text-secondary flex items-center">
      <h2 className="text-2xl font-semibold">🍀Fortune Bank</h2>
      {user && (
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="text-lg hover:text-primary transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
