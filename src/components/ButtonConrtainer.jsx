import React from "react";

function ButtonConrtainer({ buttons, setIsSelected, isSelected }) {
  return (
    <div className="flex gap-2 h-max max-md:flex-row max-md:w-full  flex-col px-3 py-4 border-2 border-gray  rounded-[35px]   w-1/3 items-start justify-start bg-secondary">
      {buttons.map((button, index) => (
        <button
          onClick={() => setIsSelected(index)}
          key={index}
          className={`  ${
            isSelected === index ? " bg-dark text-secondary " : ""
          }font-medium  bg-btn max-md:text-sm   text-xl capitalize py-6 flex items-center justify-center max-md:h-[40px]  rounded-[35px] max-md:px-3   text-dark w-full border-2 border-slate-600`}
        >
          {button}
        </button>
      ))}
    </div>
  );
}

export default ButtonConrtainer;
