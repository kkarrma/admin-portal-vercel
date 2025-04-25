import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Handles protected route access based on authentication and roles
 * @param {object} props
 * @param {JSX.Element} props.element - The component to render if allowed
 * @param {boolean} props.validator - Whether the user is logged in
 * @param {string} props.userRole - Current user's role
 * @param {string[]} props.allowedRoles - Roles allowed to access this route
 */
export default function ProtectedRoute({ element, validator, userRole, allowedRoles }) {
  if (!validator) return <Navigate to="/sign-in" replace />;
  if (!allowedRoles.includes(userRole)) return <Navigate to="/403" replace />;

  return element;
}
