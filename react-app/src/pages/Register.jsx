import React, { useState } from "react";
import { registerUser } from "../services/api";
import "../styles/Register.css";

function Register({ onBack }) {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            const data = {
                            username: fullName,
                            email: email,
                            password: password,
                            role: "USER"
                        };

            await registerUser(data);

            alert("Registration successful!");

            onBack();

        } catch (error) {

            console.error("Registration error:", error);

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (

        <div className="register-page">

            {/* LEFT SIDE */}

            <div className="register-left">

                <div className="register-brand">

                    <div className="register-brand-icon">
                        🤖
                    </div>

                    <h1>
                        AI ChatBot
                        <br />
                        Integration Platform
                    </h1>

                    <p>
                        Create your account and start
                        <br />
                        exploring intelligent conversations.
                    </p>

                </div>

            </div>


            {/* RIGHT SIDE */}

            <div className="register-right">

                <div className="register-box">

                    <div className="register-icon">
                        👤
                    </div>

                    <h2>Create Account</h2>

                    <p className="register-subtitle">
                        Register as a platform user
                    </p>


                    <form onSubmit={handleRegister}>

                        {/* FULL NAME */}

                        <div className="register-input-group">

                            <label>Full Name</label>

                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={fullName}
                                onChange={(e) =>
                                    setFullName(e.target.value)
                                }
                                required
                            />

                        </div>


                        {/* EMAIL */}

                        <div className="register-input-group">

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


                        {/* PASSWORD */}

                        <div className="register-input-group">

                            <label>Password</label>

                            <input
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                        </div>


                        {/* CONFIRM PASSWORD */}

                        <div className="register-input-group">

                            <label>Confirm Password</label>

                            <input
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />

                        </div>


                        <button
                            type="submit"
                            className="register-button"
                        >
                            Create Account
                        </button>

                    </form>


                    <div className="register-divider">
                        <span>Already have an account?</span>
                    </div>


                    <button
                        type="button"
                        className="back-login-button"
                        onClick={onBack}
                    >
                        ← Back to Login
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Register;