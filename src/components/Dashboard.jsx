import React, { useState } from "react";
import Header from "./Header";
import AccountDetails from "./AccountDetails";
import MainDataContainer from "./MainDataContainer";
import ButtonConrtainer from "./ButtonConrtainer";

function Dashboard() {
  const [isSelected, setIsSelected] = useState(1);

  const buttons = [
    "request for loan",
    "All transactions",
    "transfer money",
    "withdrawl money",
  ];
  return (
    <>
      <Header />
      <main className="flex justify-between gap-5  my-5  max-md:flex-col-reverse">
        {/* container left */}
        <div className="flex h-full   flex-1 flex-col  gap-5  items-start justify-start ">
          {/* balance display */}
          <AccountDetails />
          {/* Render section */}
          <MainDataContainer isSelected={isSelected} />
        </div>
        {/* container right */}
        <ButtonConrtainer
          buttons={buttons}
          setIsSelected={setIsSelected}
          isSelected={isSelected}
        />
      </main>
    </>
  );
}

export default Dashboard;
