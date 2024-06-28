import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { LucideEdit, LucideTrash2 } from "lucide-react";

export default function UserTable() {
    const [editRowIndex, setEditRowIndex] = useState(null);

    const initialData = [
        { firstName: "Dixit", lastName: "Rakholiya", email: "ddr@gmail.com" },
        { firstName: "Chai", lastName: "Code", email: "hiteshc@gmail.com" },
        { firstName: "Harsh", lastName: "Hindu", email: "hh@gmail.com" },
    ];
    const [data, setData] = useState(() => {
        const savedData = localStorage.getItem("employeeData");
        return savedData ? JSON.parse(savedData) : initialData;
    });

    useEffect(() => {
        localStorage.setItem("userDataTable", JSON.stringify(data));
    }, [data]);

    const handleInputChange = (e, rowIndex, columnName) => {
        const updatedData = [...data];
        updatedData[rowIndex][columnName] = e.target.value;
        setData(updatedData);
    };

    const handleDeleteClick = (rowIndex) => {
        if (window.confirm("Are you sure you want to delete this profile? || શું તમારે આ ડેટા રદ કરવો છે?")) {
            const updatedData = data.filter((_, index) => index !== rowIndex);
            setData(updatedData);
            alert("Profile deleted. || માહીતી રદ થઈ.");
        } else {
            alert("Thank you, for your answer. 🙏 || જવાબ આપવા માટે તમારો ધન્યવાદ. 🙏");
        }
    };

    const handleEditClick = (rowIndex) => {
        setEditRowIndex(rowIndex);
    };

    const handleSaveClick = () => {
        setEditRowIndex(null);
        localStorage.setItem("employeeData", JSON.stringify(data));
        alert("Profile updated. || માહીતી અપડેટ થઈ.");
    };

    const columns = [
        // { header: "Action", accessor: "action" },
        { header: "First Name", accessor: "firstName" },
        { header: "Last Name", accessor: "lastName" },
        { header: "Email", accessor: "primaryEmail" },
        { header: "Contact No.", accessor: "phoneNo" },
        { header: "Department", accessor: "department" },
        { header: "Designation", accessor: "designation" },
    ];

    return (
        <div className="min-h-screen py-3 rounded-xl bg-blue-400">
            <div className="Container w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
                <Table className="min-w-full divide-y divide-gray-800">
                    <TableHeader className="border">
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={column.accessor} className="text-[16px] text-center">{column.header}</TableHead>
                            ))}
                            <TableHead className="text-[16px] text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((row, rowIndex) => (
                            <TableRow key={rowIndex} className={editRowIndex === rowIndex ? "bg-white" : ""}>
                                {columns.map((column) => (
                                    <TableCell key={column.accessor} className="font-semibold text-center border">
                                        {editRowIndex === rowIndex ? (
                                            <input
                                                type="text"
                                                value={row[column.accessor]}
                                                onChange={(e) => handleInputChange(e, rowIndex, column.accessor)}
                                                className="w-full border  font-semibold border-black p-1"
                                            />
                                        ) : (
                                            row[column.accessor]
                                        )}
                                    </TableCell>
                                ))}
                                <TableCell className="flex justify-center items-center space-x-2 border border-l-0 border-t-0 border-r-white">
                                    {editRowIndex === rowIndex ? (
                                        <Button
                                            variant="primary"
                                            className="bg-blue-300 rounded-xl px-5 text-fuchsia-950 hover:bg-blue-950 hover:text-white duration-300"
                                            onClick={handleSaveClick}
                                        >
                                            Save
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                variant="primary"
                                                className="bg-blue-300 rounded-xl px-5 text-fuchsia-950 hover:bg-blue-950 hover:text-white duration-300"
                                                onClick={() => handleEditClick(rowIndex)}
                                            >
                                                <LucideEdit width={16} height={16} />
                                            </Button>
                                            <Button
                                                variant="danger"
                                                className="bg-red-300 rounded-xl px-5 text-fuchsia-950 hover:bg-red-800 hover:text-white duration-300"
                                                onClick={() => handleDeleteClick(rowIndex)}
                                            >
                                                <LucideTrash2 width={16} height={16} />
                                            </Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
