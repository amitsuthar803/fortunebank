import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="bg-dark min-h-screen flex flex-col items-center justify-center p-4 text-secondary">
      <div className="w-full max-w-md bg-primary rounded-[35px] p-8 shadow-lg">
        <div className="flex items-center justify-center mb-8">
          <span className="text-6xl">🍀</span>
          <div className="ml-4">
            <h1 className="text-4xl font-semibold text-dark">Fortune Bank</h1>
            <p className="text-dark tracking-wide">
              Your Future, <span className="font-medium">Our Priority.</span>
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-dark text-secondary py-4 px-6 rounded-[20px] flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all font-medium text-lg"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-6 h-6"
            />
            Sign in with Google
          </button>

          <div className="text-center text-dark">
            <p className="text-sm">
              By signing in, you agree to our{" "}
              <a href="#" className="underline hover:text-secondary">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline hover:text-secondary">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
