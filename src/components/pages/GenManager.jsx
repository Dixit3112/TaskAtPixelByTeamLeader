import React, { useEffect, useState } from 'react';
import UserTable from './UserDataTableByShadCNUI';

const GenManagerDashboard = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const [employees, setEmployees] = useState(JSON.parse(localStorage.getItem('employeeData')));
    useEffect(() => {
        const isManager = loggedInUser.designation === 'General Manager';
        const storedEmployee = JSON.parse(localStorage.getItem('employeeData'));
        const filterEmployee = storedEmployee.filter(value => isManager || (!isManager && loggedInUser.name === value.name));
        setEmployees(filterEmployee);
    }, []);

    return (
        <div className="mainDash my-10">
            <div className="container mx-auto px-0 sm:px-6 lg:px-8">
                <div className="Container w-full md:max-w-full lg:max-w-full mx-auto">
                    <h2 className="text-center text-2xl text-blue-500 mb-5 underline sm:text-3xl md:text-4xl lg:text-5xl">
                        General Manager Dashboard
                    </h2>
                    <div className="max-w-full w-full mx-auto md:max-w-[750px] lg:max-w-[1000px]">
                        <UserTable />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenManagerDashboard;
