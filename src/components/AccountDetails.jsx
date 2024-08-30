import React from "react";
import { formatDateWithYear, formatTime } from "../utils/dateUtils";
import { useCurrentTime } from "../hooks/useCurrentTime";

function AccountDetails() {
  const currentTime = useCurrentTime();

  return (
    <div className=" flex justify-between items-start rounded-[35px] py-6 px-5 bg-primary border-2 border-gray w-full">
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">Welcome, Amit Suthar</h2>
        <span className="text-primarylight font-semibold">
          {formatDateWithYear(new Date())}
        </span>

        {/* <span className=" text-primarylight font-semibold">04:00 pm</span> */}
        <span className=" text-primarylight capitalize font-semibold">
          {formatTime(currentTime)}
        </span>
      </div>
      <div>
        <h2 className=" font-semibold text-lg">Current Balance</h2>
        <span className=" text-dark font-bold   text-xl ">25,0000</span>
      </div>
    </div>
  );
}

export default AccountDetails;
