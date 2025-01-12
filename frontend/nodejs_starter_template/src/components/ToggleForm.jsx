import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveAuthToken } from "../features/authSlice.js";
import { useNavigate } from "react-router-dom";

const ToggleForm = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="flex justify-center items-center space-x-4 mb-6">
                <button
                    onClick={() => setIsLogin(true)}
                    className={`px-4 py-2 font-bold text-sm rounded ${isLogin ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                >
                    Login
                </button>
                <button
                    onClick={() => setIsLogin(false)}
                    className={`px-4 py-2 font-bold text-sm rounded ${!isLogin ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                >
                    Register
                </button>
            </div>
            {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
    );
};

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await fetch("http://localhost:8000/api/v1/users/login", {
                method: "POST",
                
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Invalid login credentials");
            }

            const responseFromServer = await response.json();
            // console.log(JSON.stringify(responseFromServer.data.accessToken));
            if (!responseFromServer.data.accessToken == '') {
                dispatch(saveAuthToken(responseFromServer.data.accessToken));
                setSuccessMessage("Login successful!");
                navigate("/dashboard");
            }
            else
                setErrorMessage("Token not found");
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="bg-white shadow-md rounded px-8 py-6 w-96">
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
            {errorMessage && <div className="bg-red-100 p-2 rounded mb-4">{errorMessage}</div>}
            {successMessage && <div className="bg-green-100 p-2 rounded mb-4">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await fetch("http://localhost:8000/api/v1/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Invalid login credentials");
            }

            const responseFromServer = await response.json();
            setSuccessMessage(responseFromServer.message);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="bg-white shadow-md rounded px-8 py-6 w-96">
            <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
            {errorMessage && <div className="bg-red-100 p-2 rounded mb-4">{errorMessage}</div>}
            {successMessage && <div className="bg-green-100 p-2 rounded mb-4">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default ToggleForm;
