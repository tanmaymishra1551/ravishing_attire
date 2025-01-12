import React, { useState, useEffect } from "react";
import Layout from "../pages/Layout.jsx";

const Dashboard = () => {
    // Set up state variables to store data
    const [data, setData] = useState({
        totalSales: 0,
        newUsers: 0,
        activeProjects: 0
    });

    useEffect(() => {
        // Fetch the data from the backend API
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/v1/users/usercount");
                const result = await response.json();
                setData(result);  // Update state with the fetched data
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchData();  // Call fetchData when the component mounts
    }, []);  // Empty dependency array ensures the effect runs only once when the component mounts

    return (
        <Layout>
            <div className="grid grid-cols-3 gap-4">
                {/* Card 1 */}
                <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
                    <p className="text-2xl font-bold">₹{data.totalSales}</p>
                </div>

                {/* Card 2 */}
                <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                    <p className="text-2xl font-bold">{data.userCount}</p>
                </div>

                {/* Card 3 */}
                <div className="bg-white shadow rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Active Projects</h3>
                    <p className="text-2xl font-bold">{data.activeProjects}</p>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
