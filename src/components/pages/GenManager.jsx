// src/components/GenManagerDashboard.js
import React, { useEffect, useState } from 'react';
import UserTable from './TableOfShadCN';


const GenManagerDashboard = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const [employees, setEmployees] = useState(JSON.parse(localStorage.getItem('employeeData')));
    useEffect(() => {
        const isManager = loggedInUser.designation === 'General Manager'
        // console.log("loggedInUser***", loggedInUser) // value is Object
        const storedEmployee = JSON.parse(localStorage.getItem('employeeData'));
        const filterEmployee = storedEmployee.filter(value => isManager || (!isManager && loggedInUser.name === value.name))
        setEmployees(filterEmployee)

        // if (loggedInUser) {
        //     setUser(loggedInUser);
        //     // console.log("User", Object.entries(user)) // Object.entries(user) = 0:(2)['name', 'dixit'], 1 : (2)['email', 'hymenaeos.mauris@aol.org'], 2 : (2)['password', '159487'], 3 : (2)['phoneNo', '986922505'], 4 : (2)['address', 'Ap #304-4693 Nulla. Avenue'], 5 : (2)['gender', 'Male'], 6 : (2)['birthDate', '2024-06-07'], 7 : (2)['department', 'QA'], 8 : (2)['designation', 'Officer'], 9 : (2)['salary', '100000'], 10: (2)['joiningDate', '2024-06-14'], 11: (2)['statusbar', 'Active'], 12: (2)['role', 'Main manufacturing process '], length : 13
        // }
    }, []);

    return (
        <div className="mainDash my-10">
            <div className="Container">
                <div className='w-full mx-auto'>
                    <h2 className='text-center text-2xl text-blue-500 mb-5 underline'>General Manager Dashboard</h2>
                    <div className='max-w-[1000px] flex flex-wrap gap-[10px]'>
                        <UserTable />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenManagerDashboard;
