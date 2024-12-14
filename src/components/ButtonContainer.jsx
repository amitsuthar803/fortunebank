import React from "react";
import { FaMoneyBillWave, FaHistory, FaExchangeAlt, FaMoneyBillAlt } from "react-icons/fa";

function ButtonConrtainer({ buttons, setIsSelected, isSelected }) {
  const icons = [
    <FaMoneyBillWave size={24} />,
    <FaHistory size={24} />,
    <FaExchangeAlt size={24} />,
    <FaMoneyBillAlt size={24} />
  ];

  return (
    <div className="flex gap-2 h-max max-md:justify-between max-md:flex-row max-md:w-full flex-col px-3 py-4 border-2 border-gray rounded-[35px] w-1/3 items-start justify-start bg-secondary">
      {buttons.map((button, index) => (
        <button
          onClick={() => setIsSelected(index)}
          key={index}
          className={`${
            isSelected === index ? "bg-dark text-secondary" : ""
          } font-medium bg-btn text-xl capitalize py-6 flex items-center justify-center gap-3 max-md:h-[40px] rounded-[35px] max-md:w-[100%] max-md:px-3 text-dark w-full border-2 border-slate-600 max-md:w-[60px]`}
        >
          {icons[index]}
          <span className="max-md:hidden">{button}</span>
        </button>
      ))}
    </div>
  );
}

export default ButtonConrtainer;
