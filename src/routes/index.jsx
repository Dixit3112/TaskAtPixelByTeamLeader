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
// import ProtectedRoute from "./ProtectedRoute";


const user = JSON.parse(localStorage.getItem('loggedInUser'));


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
                path: `/${user.firstName}/punching`,
                element: <PunchTime />
                // element: <ProtectedRoute /> ? <PunchTime /> : <Home />,
            },
            {
                path: `/employee/${user.firstName}`,
                element: <><EmployeeProfile /></>,
            },
            {
                path: `/hod/${user.firstName}/dashboard`,
                element: <><HODDashboard /></>,
            },
            {
                path: `/hr/${user.firstName}/dashboard`,
                element: <><HRDashboard /></>,
            },
            {
                path: `/gm/${user.firstName}/dashboard`,
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