import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import Pokemon from "../pages/Pokemon.jsx";
import { PrivateRoute } from "./PrivateRoute.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export function AppRouter() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/home" replace /> : <Login />
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/pokemon/:id"
        element={
          <PrivateRoute>
            <Pokemon />
          </PrivateRoute>
        }
      />
      <Route
        path="/"
        element={
          <Navigate
            to={isAuthenticated ? "/home" : "/login"}
            replace
            state={{ from: location }}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
