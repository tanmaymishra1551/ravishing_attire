// Layout.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearAuthToken } from "../features/authSlice.js";
import { useNavigate, Link } from "react-router-dom";

const Layout = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector((state) => state.auth.accessToken);
    // console.log(`Access Token: ${accessToken}`); // Debugging
    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/users/logout", {
                method: "POST",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                dispatch(clearAuthToken()); // Clear Redux store
                navigate("/"); // Redirect to login page
            } else {
                console.error("Failed to log out");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-800 text-white flex flex-col">
                <div className="p-4 text-lg font-bold border-b border-blue-700">
                    Dashboard
                </div>
                <nav className="flex-1">
                    <ul>
                        <li className="px-4 py-2 hover:bg-blue-700 cursor-pointer">
                            <Link to="/dashboard" className="text-white">
                                Dashboard
                            </Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-blue-700 cursor-pointer">
                            Analytics
                        </li>
                        <li className="px-4 py-2 hover:bg-blue-700 cursor-pointer">
                            <Link to="/users" className="text-white">
                                Users
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="p-4 border-t border-blue-700">
                    <button
                        className="w-full bg-red-600 hover:bg-red-700 py-2 px-4 rounded"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow p-4">
                    <div className="text-lg font-semibold">Welcome to Dashboard</div>
                </header>

                {/* Main Section */}
                <main className="flex-1 p-6">
                    {children} {/* This will render the content passed to Layout */}
                </main>
            </div>
        </div>
    );
};

export default Layout;
