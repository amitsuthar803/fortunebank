import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiErrorCircle } from 'react-icons/bi';
import { MdHome } from 'react-icons/md';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-dark min-h-screen flex flex-col items-center justify-center p-4 text-secondary">
      <div className="w-full max-w-md bg-primary rounded-[35px] p-8 shadow-lg text-center">
        <div className="flex justify-center mb-6">
          <BiErrorCircle className="text-red-500 text-8xl" />
        </div>
        
        <h1 className="text-4xl font-semibold text-dark mb-4">Oops!</h1>
        <p className="text-dark text-lg mb-8">
          The page you're looking for doesn't exist.
        </p>

        <button
          onClick={() => navigate('/')}
          className="bg-dark text-secondary py-4 px-8 rounded-full flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all font-medium text-lg mx-auto"
        >
          <MdHome size={24} />
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
