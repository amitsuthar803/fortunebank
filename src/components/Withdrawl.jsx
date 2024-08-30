import React from "react";

function Withdrawl() {
  return (
    <div className="h-full">
      <h3 className="text-dark font-medium text-lg">Withdrawl Money</h3>

      <div>
        <form action="" className="flex flex-col gap-3">
          <div className="flex  mt-2 flex-col">
            <label htmlFor="username">UserName</label>
            <input
              placeholder="lochan suthar"
              className="mt-1  rounded-full border-2 text-stone-500 border-gray bg-btn px-4 py-2"
              type="text"
            />
          </div>
          <div className="flex  mt-2 flex-col">
            <label htmlFor="account">Account Number</label>
            <input
              placeholder="9950554371"
              className="mt-1  rounded-full border-2 text-stone-500 border-gray bg-btn px-4 py-2"
              type="text"
            />
          </div>
          <div className="flex  mt-2 flex-col">
            <label htmlFor="amount">Amount</label>
            <input
              placeholder="5000"
              className="mt-1  rounded-full border-2 text-stone-500 border-gray bg-btn px-4 py-2"
              type="text"
            />
          </div>
          <button className="mt-2 rounded-full font-medium bg-dark text-lg text-secondary py-3">
            Transfer
          </button>
        </form>
      </div>
    </div>
  );
}

export default Withdrawl;
