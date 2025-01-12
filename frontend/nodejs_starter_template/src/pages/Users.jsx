import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State to open Create User modal
    const [currentUser, setCurrentUser] = useState(null);
    const [formData, setFormData] = useState({ username: "", email: "", fullName: "", password: "" });

    const fetchUsers = async (page = 1) => {
        setLoading(true);
        try {
            const response = await fetch(
                `http://localhost:8000/api/v1/users/users?page=${page}&limit=5`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data.users)) {
                    setUsers(data.users);
                    setTotalPages(data.totalPages);
                } else {
                    console.error("Unexpected response format:", data);
                    setUsers([]);
                }
            } else {
                console.error("Failed to fetch users");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    const handleEdit = (user) => {
        setCurrentUser(user);
        setFormData({
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            password: "", // Reset password field for editing user
        });
        setIsEditModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/v1/users/user/${currentUser._id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );
    
            if (response.ok) {
                const updatedUser = await response.json();
                console.log("Updated User:", updatedUser); // Debugging line
    
                setUsers((prevUsers) =>  
                    prevUsers.map((user) =>
                        user._id === updatedUser._id ? updatedUser : user
                    )
                );
    
                setIsEditModalOpen(false);
                setCurrentUser(null);
            } else {
                console.error("Failed to update user");
                alert("Error: Could not update user");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Error: Could not update user");
        }
    };

    const handleCancel = () => {
        setIsEditModalOpen(false);
        setIsCreateModalOpen(false); // Close the Create User modal
        setCurrentUser(null);
    };

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const response = await fetch(
                    `http://localhost:8000/api/v1/users/user/${userId}`,
                    {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                    }
                );

                if (response.ok) {
                    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
                    alert("User deleted successfully");
                } else {
                    console.error("Failed to delete user");
                }
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    const handleCreateUser = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/v1/users/createuser`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );
    
            if (response.ok) {
                const newUser = await response.json();
                setUsers((prevUsers) => [...prevUsers, newUser]);
                setIsCreateModalOpen(false);
                setFormData({ username: "", email: "", fullName: "", password: "" });
            } else {
                console.error("Failed to create user");
                alert("Error: Could not create user");
            }
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Error: Could not create user");
        }
    };

    const filteredUsers = users.filter((user) => {
        return (
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const sortedUsers = filteredUsers.sort((a, b) => {
        const key = "username";
        return sortOrder === "asc"
            ? a[key].localeCompare(b[key])
            : b[key].localeCompare(a[key]);
    });

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    };

    if (loading) {
        return (
            <Layout>
                <div>Loading...</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by username or email"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border border-gray-300 px-4 py-2 w-full max-w-md rounded-sm"
                />
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded ml-4"
                >
                    Add User
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border-b py-2 px-4 text-left">
                                <button onClick={toggleSortOrder} className="flex items-center">
                                    Username
                                    {sortOrder === "asc" ? " 🔼" : " 🔽"}
                                </button>
                            </th>
                            <th className="border-b py-2 px-4 text-left">Email</th>
                            <th className="border-b py-2 px-4 text-left">Full Name</th>
                            <th className="border-b py-2 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedUsers.length > 0 ? (
                            sortedUsers.map((user) => (
                                <tr key={user._id}>
                                    <td className="border-b py-2 px-4">{user.username}</td>
                                    <td className="border-b py-2 px-4">{user.email}</td>
                                    <td className="border-b py-2 px-4">{user.fullName}</td>
                                    <td className="border-b py-2 px-4">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="mr-2 text-blue-600"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="text-red-600"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="self-center text-lg font-semibold">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

            {(isEditModalOpen || isCreateModalOpen) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">{isEditModalOpen ? "Edit User" : "Create User"}</h2>
                        <div>
                            <label className="block mb-2">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="border px-4 py-2 w-full mb-4"
                            />
                            <label className="block mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="border px-4 py-2 w-full mb-4"
                            />
                            <label className="block mb-2">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="border px-4 py-2 w-full mb-4"
                            />
                            {isCreateModalOpen && (
                                <>
                                    <label className="block mb-2">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="border px-4 py-2 w-full mb-4"
                                    />
                                </>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleCancel}
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={isCreateModalOpen ? handleCreateUser : handleSave}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                {isCreateModalOpen ? "Create" : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Users;
