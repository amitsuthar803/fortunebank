import React from "react";
import Loan from "./Loan";
import Transaction from "./Transaction";
import TransferAmount from "./TransferAmount";
import Withdrawl from "./Withdrawl";

function MainDataContainer({ isSelected }) {
  // conditionally rendering
  const RenderComponents = ({ index }) => {
    switch (index) {
      case 0:
        return <Loan />;
      case 1:
        return <Transaction />;
      case 2:
        return <TransferAmount />;
      case 3:
        return <Withdrawl />;
    }
  };

  return (
    <div className="h-max overflow-hidden overflow-y-scroll rounded-[35px] py-6 px-5 border-2 border-gray bg-secondary w-full">
      <RenderComponents index={isSelected} />
    </div>
  );
}

export default MainDataContainer;
