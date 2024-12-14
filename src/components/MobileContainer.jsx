import React from "react";
import { FaHome, FaWallet, FaExchangeAlt, FaSignOutAlt } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";

function MobileContainer() {
  const navItems = [
    { icon: <FaHome size={24} />, label: "Home" },
    { icon: <FaWallet size={24} />, label: "Wallet" },
    { icon: <FaExchangeAlt size={24} />, label: "Transfer" },
    { icon: <IoMdNotifications size={24} />, label: "Notifications" },
    { icon: <FaSignOutAlt size={24} />, label: "Logout" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-secondary border-t-2 border-gray">
      <nav className="flex justify-around items-center p-4">
        {navItems.map((item, index) => (
          <button
            key={index}
            className="flex flex-col items-center gap-1 text-dark hover:text-primary transition-colors"
          >
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default MobileContainer;
