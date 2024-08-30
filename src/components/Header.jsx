import React from "react";

function Header() {
  return (
    <header className="h-20  px-6 rounded-[30px] bg-dark mt-4 justify-between text-secondary flex items-center">
      <h2 className=" text-2xl font-semibold">🍀Fortune Bank</h2>
      <div>
        <button className="text-lg">Logout</button>
      </div>
    </header>
  );
}

export default Header;
