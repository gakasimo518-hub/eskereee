import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setAuthenticated } from "./store/authSlice";
import axios from "axios";

// Pages (assume they exist in the project)
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ClientsPage from "./pages/ClientsPage";
import EmployeesPage from "./pages/EmployeesPage";
import NotFoundPage from "./pages/NotFoundPage";

// Simple layout with a sidebar navigation
const Layout: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setAuthenticated(false));
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Eskereee</h2>
        <nav className="flex-1 space-y-2">
          <a
            href="/dashboard"
            className="block py-2 px-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Dashboard
          </a>
          <a
            href="/clients"
            className="block py-2 px-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Clienti
          </a>
          <a
            href="/employees"
            className="block py-2 px-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Dipendenti
          </a>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-4 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

// PrivateRoute component – redirects to /login if not authenticated
const PrivateRoute: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // On app start, try to restore auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Optional: verify token with backend
      axios
        .get("/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          dispatch(setAuthenticated(true));
        })
        .catch(() => {
          localStorage.removeItem("token");
          dispatch(setAuthenticated(false));
        });
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;