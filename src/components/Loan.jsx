import React from "react";

function Loan() {
  return (
    <div className="h-full">
      <h3 className="text-dark font-medium text-lg">Request For Loan</h3>
      <form action="" className="flex flex-col gap-3">
        <div className="flex  mt-2 flex-col">
          <label htmlFor="purpose" className="">
            Loan Purpose
          </label>
          <select
            name="purpose"
            className="mt-1  rounded-full border-2 text-stone-500 border-gray bg-btn px-4 py-2"
            id="purpose"
          >
            <option value="education">Education</option>
            <option value="education">Personal</option>
            <option value="education">Home Loan</option>
            <option value="education">Again Property</option>
          </select>
        </div>
        <div className="flex   flex-col">
          <label htmlFor="request">Request Amount</label>
          <input
            type="text"
            placeholder="Enter Request Amount Here..."
            className="mt-1  rounded-full border-2 text-stone-500 border-gray bg-btn px-4 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="emi">Your Monthly Emi</label>
          <input
            type="text"
            disabled
            value={18000}
            className="mt-1  rounded-full border-2 text-stone-500 border-gray bg-btn px-4 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="tenure">Loan Tenture</label>
          <input
            type="text"
            disabled
            value={"5 year"}
            className="mt-1  rounded-full border-2 text-stone-500 border-gray bg-btn px-4 py-2"
          />
        </div>
        <button className="mt-2 rounded-full font-medium bg-dark text-lg text-secondary py-3">
          Submit Request
        </button>
      </form>
    </div>
  );
}

export default Loan;
