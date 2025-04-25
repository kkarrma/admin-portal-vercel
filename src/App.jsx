import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./webpages/Login";
import Dashboard from "./webpages/Dashboard";
import ReturnRefund from "./webpages/Return-refund";
import ProductManagement from "./webpages/Product-management";
import UserManagement from "./webpages/User-management";
import Product from "./webpages/Product";
import PetManagement from "./webpages/Pet-Management";
import ForgotPassword from "./webpages/ForgotPassword";
import Forbidden from "./webpages/errors/403";
import NotFound from "./webpages/errors/404";
import ReportManagement from "./webpages/ReportManagement";

import { USER_ROLES, ALL_AUTHORIZED, ALL_ADMINS } from "./variables/USER_ROLES";

function App() {
  const [accountStatus, setAccountStatus] = useState(false);
  const [accountType, setAccountType] = useState(USER_ROLES.VISITOR);
  const [profileData, setProfileData] = useState({
    pfp: null,
    username: ""
  });

  const PUBLIC_ROUTES = [
    {
      path: "/sign-in",
      element: (
        <Login
          mode="SIGN_IN"
          accountStatus={{ value: accountStatus, setter: setAccountStatus }}
          accountType={{ value: accountType, setter: setAccountType }}
          profileData={{ value: profileData, setter: setProfileData }}
        />
      )
    },
    {
      path: "/sign-up",
      element: (
        <Login
          mode="SIGN_UP"
          accountStatus={{ value: accountStatus, setter: setAccountStatus }}
          accountType={{ value: accountType, setter: setAccountType }}
          profileData={{ value: profileData, setter: setProfileData }}
        />
      )
    },
    {
      path: "/account/forgot-password",
      element: <ForgotPassword />
    }
  ];

  const PRIVATE_ROUTES = [
    {
      path: "/",
      element: <Dashboard />,
      roles: ALL_AUTHORIZED
    },
    {
      path: "/orders/product",
      element: <Product />,
      roles: ALL_AUTHORIZED
    },
    {
      path: "/orders/return-refund",
      element: <ReturnRefund />,
      roles: ALL_AUTHORIZED
    },
    {
      path: "/orders/cancellation-and-refund",
      element: <Navigate to="/404" replace />,
      roles: ALL_AUTHORIZED
    },
    {
      path: "/management/product",
      element: <ProductManagement />,
      roles: ALL_ADMINS
    },
    {
      path: "/management/article",
      element: <Navigate to="/404" replace />,
      roles: ALL_ADMINS
    },
    {
      path: "/management/user",
      element: <UserManagement />,
      roles: ALL_ADMINS
    },
    {
      path: "/management/pet-breed",
      element: <PetManagement />,
      roles: [USER_ROLES.SUPER_ADMIN]
    },
    {
      path: "/management/reports",
      element: <ReportManagement />,
      roles: [USER_ROLES.SUPER_ADMIN]
    }
  ];

  const ERROR_ROUTES = [
    {
      path: "/403",
      element: <Forbidden />
    },
    {
      path: "/404",
      element: <NotFound />
    }
  ];

  return (
    <BrowserRouter>
      <Sidebar
        accountStatus={{ value: accountStatus, setter: setAccountStatus }}
        accountType={accountType}
        profileData={profileData}
      >
        <Routes>
          {/* Public routes */}
          {PUBLIC_ROUTES.map(({ path, element }, index) => (
            <Route key={`public-${index}`} path={path} element={element} />
          ))}

          {/* Private/Protected routes */}
          {PRIVATE_ROUTES.map(({ path, element, roles }, index) => (
            <Route
              key={`private-${index}`}
              path={path}
              element={
                <ProtectedRoute
                  element={element}
                  validator={accountStatus}
                  userRole={accountType}
                  allowedRoles={roles}
                />
              }
            />
          ))}

          {/* Error routes */}
          {ERROR_ROUTES.map(({ path, element }, index) => (
            <Route key={`error-${index}`} path={path} element={element} />
          ))}

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
