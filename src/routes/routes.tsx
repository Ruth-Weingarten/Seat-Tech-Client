import { createBrowserRouter } from "react-router";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MapPage from "../pages/MapPage";
import MyBookingPage from "../pages/MyBookingPage";
import OfficePage from "../pages/OfficePage";
import EmployeesPage from "../pages/EmployeesPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import ErrorPage from "../pages/ErrorPage";
import NotFoundPage from "../pages/NotFoundPage";
import App from "../App";
import AppLayout from "../components/AppLayout";
const routes = createBrowserRouter([
    {
        path: "",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <HomePage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "register",
                element: <RegisterPage />
            },

            {
                element: <ProtectedRoute />,
                children: [{
                    element: <AppLayout></AppLayout>,
                    children: [{
                        path: "map",
                        element: <MapPage />
                    },
                    {
                        path: "my-bookings",
                        element: <MyBookingPage />
                    },
                    {
                        element: <AdminRoute />,
                        children: [
                            { path: "admin/office", element: <OfficePage /> },
                            { path: "admin/employees", element: <EmployeesPage /> },
                        ],
                    },

                    ]
                }]



            },

            {
                path: "*",
                element: <NotFoundPage />
            }
        ]
    }
])

export default routes