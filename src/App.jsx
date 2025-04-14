import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./webpages/Login"
import Sidebar from "./components/Sidebar"
import Dashboard from "./webpages/Dashboard"
import { useState } from "react"
import ReturnRefund from "./webpages/Return-refund"
import { ALL_AUTHORIZED, USER_ROLES } from "./variables/USER_ROLES"
import ProductManagement from "./webpages/Product-management"
import default_user_icon from "./assets/default_user_icon.png";
import UserManagement from "./webpages/User-management"
import Product from "./webpages/Product"
import PetManagement from "./webpages/Pet-Management"
import Forbidden from "./webpages/errors/403"
import NotFound from "./webpages/errors/404"

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
      element:
        <Login
          mode="SIGN_IN"
          accountStatus={{ value: accountStatus, setter: setAccountStatus }}
          accountType={{ value: accountType, setter: setAccountType }}
          profileData={{ value: profileData, setter: setProfileData }}
        />
    },
    {
      path: "/sign-up",
      element:
        <Login
          mode="SIGN_UP"
          accountStatus={{ value: accountStatus, setter: setAccountStatus }}
          accountType={{ value: accountType, setter: setAccountType }}
          profileData={{ value: profileData, setter: setProfileData }}
        />
    }
  ]

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
      element: <Navigate to="/404" replace />, // CANCELLATION AND REFUND
      roles: ALL_AUTHORIZED
    },
    {
      path: "/management/product",
      element: <ProductManagement />,
      roles: ALL_AUTHORIZED
    },
    {
      path: "/management/article",
      element: <Navigate to="/404" replace />, // ARTICLE MANAGEMENT
      roles: ALL_AUTHORIZED
    },
    {
      path: "/management/user",
      element: <UserManagement />,
      roles: ALL_AUTHORIZED
    },
    {
      path: "/management/pet-breed",
      element: <PetManagement />,
      roles: ALL_AUTHORIZED
    },
  ]

  const ERROR_ROUTES = [
    {
      path: "/403",
      element: <Forbidden />,
      metadata: {
        error_name: "403 - FORBIDDEN",
        reason: "Authorized but lacks permission to access the page."
      }
    },
    {
      path: "/404",
      element: <NotFound />,
      metadata: {
        error_name: "404 - NOT FOUND",
        reason: "Webpage does not exist."
      }
    }
  ]


  return (
    <BrowserRouter>
      <Sidebar accountStatus={{ value: accountStatus, setter: setAccountStatus }} accountType={accountType} profileData={profileData}>
        <Routes>
          {PUBLIC_ROUTES.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
          {PRIVATE_ROUTES.map(({ path, element, roles }, index) => (
            <Route
              key={`protected-${index}`}
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
          {ERROR_ROUTES.map(({ path, element }, index) => (
            <Route key={`error-${index}`} path={path} element={element} />
          ))}
          <Route path="/*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  )
}

function ProtectedRoute({ element, validator, userRole, allowedRoles }) {
  if (!validator) return <Navigate to="/sign-in" replace />;
  if (!allowedRoles.some(role => role === userRole)) return <Navigate to="/403" replace />;

  return element;
}

export default App