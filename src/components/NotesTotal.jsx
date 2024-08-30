import React from "react";

function NotesTotal() {
  return (
    <div className="flex  mt-2 flex-col">
      <label htmlFor="notes">Notes Type</label>
      {/* notes list */}
      <div className="flex flex-col gap-2 ">
        {/* 1 */}
        <div className="flex gap-5">
          <div className=" flex items-center justify-start gap-2">
            <label htmlFor="2000">
              2000<span className="ml-2 font-medium">X</span>
            </label>
            <input
              placeholder="00"
              className="mt-1  w-[100px]  rounded-full border-2 text-stone-500 border-gray bg-btn px-4 py-2"
              type="number"
              id="2000"
            />
          </div>
          <div className=" flex items-center justify-start gap-2">
            <label htmlFor="500">
              500<span className="ml-2 font-medium">X</span>
            </label>
            <input
              placeholder="00"
              className="mt-1  w-[100px] rounded-full border-2 text-stone-500 border-gray bg-btn px-4 py-2"
              type="number"
              id="500"
            />
          </div>
          <div className=" flex items-center justify-start gap-2">
            <label htmlFor="200">
              200<span className="ml-2 font-medium">X</span>
            </label>
            <input
              placeholder="00"
              className="mt-1  w-[100px] rounded-full border-2 text-stone-500 border-gray bg-btn px-4 py-2"
              type="number"
              id="200"
            />
          </div>
          <div className=" flex items-center justify-start gap-2">
            <label htmlFor="100">
              100<span className="ml-2 font-medium">X</span>
            </label>
            <input
              placeholder="00"
              className="mt-1  w-[100px] rounded-full border-2 text-stone-500 border-gray bg-btn px-4 py-2"
              type="number"
              id="100"
            />
          </div>
        </div>
        {/*2  */}
        <div className="flex gap-5">
          <div className=" flex items-center justify-start gap-2">
            <label htmlFor="50">
              50<span className="ml-2 font-medium">X</span>
            </label>
            <input
              placeholder="00"
              className="mt-1  w-[100px] rounded-full border-2 text-stone-500 border-gray bg-btn px-4 py-2"
              type="number"
              id="50"
            />
          </div>
          <div className=" flex items-center justify-start gap-2">
            <label htmlFor="20">
              20<span className="ml-2 font-medium">X</span>
            </label>
            <input
              placeholder="00"
              className="mt-1  w-[100px] rounded-full border-2 text-stone-500 border-gray bg-btn px-4 py-2"
              type="number"
              id="20"
            />
          </div>
          <div className=" flex items-center justify-start gap-2">
            <label htmlFor="10">
              10<span className="ml-2 font-medium">X</span>
            </label>
            <input
              placeholder="00"
              id="10"
              className="mt-1  w-[100px] rounded-full border-2 text-stone-500 border-gray bg-btn px-4 py-2"
              type="number"
            />
          </div>
          <div className=" flex items-center justify-start gap-2">
            <label htmlFor="total" className="mr-4 font-medium">
              =
            </label>
            <input
              placeholder="00"
              id="total"
              className="mt-1  w-[100px] rounded-full border-2 text-stone-500 border-gray bg-btn px-4 py-2"
              type="text"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotesTotal;
