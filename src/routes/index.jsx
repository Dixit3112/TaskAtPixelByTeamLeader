// router component variable

import { createBrowserRouter } from "react-router-dom";
import Login from "../components/pages/Login";
import SignUp from "../components/pages/SignUp";
import DefaultPage from "./DefaultPage";
import Home from "../components/pages/UserHome";
import EmployeeProfile from "../components/pages/EmployeeProfile";
import HODDashboard from "../components/pages/HODDashboard";
import HRDashboard from "../components/pages/HRDashboard";
import GenManagerDashboard from "../components/pages/GenManager";
import PunchTime from "../components/pages/EmployeeWorkTime.jsx";


const users = JSON.parse(localStorage.getItem('loggedInUser')) || [{ firstName: "" }];

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: `/${users.firstName}/punching`,
                element: <PunchTime />
            },
            {
                path: `/employee/${users.firstName}`,
                element: <><EmployeeProfile /></>,
            },
            {
                path: `/hod/${users.firstName}/dashboard`,
                element: <><HODDashboard /></>,
            },
            {
                path: `/hr/${users.firstName}/dashboard`,
                element: <><HRDashboard /></>,
            },
            {
                path: `/gm/${users.firstName}/dashboard`,
                element: <><GenManagerDashboard /></>,
            },
            {
                path: "*",
                element: <ErrorEvent />, // 404 page error
            }
        ]
    },
])

export default router;