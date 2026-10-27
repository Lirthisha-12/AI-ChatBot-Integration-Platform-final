import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/api";
import "../styles/usermanagement.css";

function UserManagement({ onBack }) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error("Error loading users:", error);
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteUser(id);

            setUsers(
                users.filter((user) => user.id !== id)
            );

        } catch (error) {

            console.error("Delete user error:", error);

            alert("Failed to delete user");
        }
    };

    const handleBack = () => {

        if (onBack) {
            onBack();
        } else {
            window.location.reload();
        }

    };

    return (
        <div className="user-management-page">

            {/* HEADER */}

            <header className="user-management-header">

                <div>
                    <h1>User Management</h1>

                    <p>
                        Manage registered users and their access
                    </p>
                </div>

                <button
                    className="user-back-button"
                    onClick={handleBack}
                >
                    ← Back to Dashboard
                </button>

            </header>


            {/* CONTENT */}

            <main className="user-management-content">

                {/* TOTAL USERS */}

                <div className="user-summary-card">

                    <div className="user-summary-icon">
                        👥
                    </div>

                    <div>
                        <span>Total Users</span>

                        <strong>
                            {users.length}
                        </strong>
                    </div>

                </div>


                {/* USERS SECTION */}

                <section className="users-section">

                    <div className="users-section-header">

                        <div>
                            <h2>Registered Users</h2>

                            <p>
                                View and manage platform users
                            </p>
                        </div>

                        <span className="user-count-badge">
                            {users.length} Users
                        </span>

                    </div>


                    {users.length === 0 ? (

                        <div className="empty-users">
                            <div>👥</div>

                            <h3>No Users Found</h3>

                            <p>
                                There are currently no registered users.
                            </p>
                        </div>

                    ) : (

                        <div className="users-table-wrapper">

                            <table className="users-table">

                                <thead>

                                    <tr>
                                        <th>ID</th>
                                        <th>User</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {users.map((user) => (

                                        <tr key={user.id}>

                                            <td>
                                                <span className="user-id">
                                                    #{user.id}
                                                </span>
                                            </td>

                                            <td>

                                                <div className="user-name-cell">

                                                    <div className="table-user-avatar">
                                                        👤
                                                    </div>

                                                    <strong>
                                                        {user.username ||
                                                            user.name ||
                                                            user.fullName ||
                                                            "Unknown User"}
                                                    </strong>

                                                </div>

                                            </td>

                                            <td>
                                                <span className="user-email">
                                                    {user.email}
                                                </span>
                                            </td>

                                            <td>

                                                <span
                                                    className={`role-badge role-${(
                                                        user.role || "USER"
                                                    ).toLowerCase()}`}
                                                >
                                                    {user.role || "USER"}
                                                </span>

                                            </td>

                                            <td>

                                                <span className="status-badge">
                                                    <span></span>
                                                    Active
                                                </span>

                                            </td>

                                            <td>

                                                <button
                                                    className="delete-user-button"
                                                    onClick={() =>
                                                        handleDelete(user.id)
                                                    }
                                                >
                                                    🗑 Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
}

export default UserManagement;