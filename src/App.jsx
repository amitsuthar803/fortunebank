import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./components/ErrorPage";
import { AuthProvider } from "./context/AuthContext";
import { BalanceProvider } from "./context/BalanceContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <BalanceProvider>
        <Router>
          <Toaster position="top-center" reverseOrder={false} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            {/* Catch all unmatched routes */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </BalanceProvider>
    </AuthProvider>
  );
}

export default App;
