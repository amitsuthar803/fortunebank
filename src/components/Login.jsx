import React from "react";

function Login() {
  return (
    <div className="bg-dark flex flex-col p-10 justify-start items-center text-secondary w-full h-screen">
      <div className="flex  h-max items-center">
        <span className="text-5xl">🍀</span>
        <div>
          <h1 className=" text-4xl font-medium">Fortune Bank</h1>
          <p className=" tracking-wide">
            Your Future,<span className="ml-2">Our Priority.</span>
          </p>
        </div>
      </div>
      {/* form container */}
      <form className=" bg-primary text-dark w-[50%] h-max">
        <div className="flex flex-col">
          <label htmlFor="email">Enter Your Email</label>
          <input type="email" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Enter Your Password</label>
          <input type="password" />
        </div>
      </form>
    </div>
  );
}

export default Login;
