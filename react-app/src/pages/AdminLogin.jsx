import React, { useState } from "react";
import { loginUser } from "../services/api";
import "../styles/AdminLogin.css";

function AdminLogin({ onBack }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleAdminLogin = async (e) => {

        e.preventDefault();

        try {

            const data = await loginUser(email, password);

            console.log("ADMIN LOGIN RESPONSE:", data);
            console.log("ROLE:", data.role);

            // Check admin role
            if (
                !data.role ||
                data.role.trim().toUpperCase() !== "ADMIN"
            ) {

                alert(
                    "Access denied. Role received: " +
                    data.role
                );

                return;
            }

            // Save login information
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", "ADMIN");

            alert("Admin Login Successful");

            // Reload application
            window.location.reload();

        } catch (error) {

            console.error("Admin login error:", error);

            alert(
                error.response?.data?.message ||
                "Invalid admin credentials"
            );
        }
    };

    return (

        <div className="admin-login-page">

            <div className="admin-login-card">

                {/* ICON */}

                <div className="admin-login-icon">
                    🛡️
                </div>

                {/* TITLE */}

                <h1>Admin Login</h1>

                <p className="admin-login-subtitle">
                    AI ChatBot Integration Platform
                </p>


                {/* FORM */}

                <form onSubmit={handleAdminLogin}>

                    <div className="admin-input-group">

                        <label>
                            Admin Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter admin email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="admin-input-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter admin password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="admin-login-button"
                    >
                        🔐 Login as Admin
                    </button>

                </form>


                {/* BACK */}

                <button
                    type="button"
                    className="admin-back-button"
                    onClick={onBack}
                >
                    ← Back to User Login
                </button>

            </div>

        </div>
    );
}

export default AdminLogin;