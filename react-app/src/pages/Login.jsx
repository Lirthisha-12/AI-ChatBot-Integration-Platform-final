import React, { useState } from "react";
import { loginUser } from "../services/api";
import Register from "./Register";
import AdminLogin from "./AdminLogin";
import "../styles/Login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showRegister, setShowRegister] = useState(false);
    const [showAdminLogin, setShowAdminLogin] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const data = await loginUser(email, password);

            console.log("LOGIN RESPONSE:", data);

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            alert("Login Successful");

            window.location.reload();

        } catch (error) {

            console.error("Login error:", error);

            alert("Invalid email or password");
        }
    };

    // Register page
    if (showRegister) {
        return (
            <Register
                onBack={() => setShowRegister(false)}
            />
        );
    }

    // Admin login page
    if (showAdminLogin) {
        return (
            <AdminLogin
                onBack={() => setShowAdminLogin(false)}
            />
        );
    }

    return (

        <div className="login-page">

            <div className="login-left">

                <div className="login-brand">

                    <div className="brand-icon">
                        🤖
                    </div>

                    <h1>
                        AI ChatBot
                        <br />
                        Integration Platform
                    </h1>

                    <p>
                        Intelligent conversations.
                        <br />
                        Powerful integrations.
                    </p>

                </div>

            </div>


            <div className="login-right">

                <div className="login-box">

                    <div className="login-icon">
                        🤖
                    </div>

                    <h2>Welcome Back!</h2>

                    <p className="login-subtitle">
                        Sign in to continue to your account
                    </p>


                    <form onSubmit={handleLogin}>

                        <div className="input-group">

                            <label>Email Address</label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>


                        <div className="input-group">

                            <label>Password</label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                        </div>


                        <button
                            type="submit"
                            className="login-button"
                        >
                            Login
                        </button>

                    </form>


                    <div className="login-divider">
                        <span>OR</span>
                    </div>


                    <div className="register-section">

                        <p>
                            Don't have an account?
                        </p>

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() =>
                                setShowRegister(true)
                            }
                        >
                            Register User
                        </button>

                    </div>


                    <div className="admin-section">

                        <p>
                            Are you an administrator?
                        </p>

                        <button
                            type="button"
                            className="admin-button"
                            onClick={() =>
                                setShowAdminLogin(true)
                            }
                        >
                            🔐 Admin Login
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;