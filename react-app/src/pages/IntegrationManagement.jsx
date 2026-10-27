import React, { useEffect, useState } from "react";

import {
    getIntegrations,
    addIntegration,
    updateIntegration,
    deleteIntegration,
    getChatBots
} from "../services/api";

import "../styles/integrationmanagement.css";

function IntegrationManagement({ onBack }) {

    const [integrations, setIntegrations] = useState([]);
    const [chatbots, setChatbots] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);

    const [botId, setBotId] = useState("");
    const [integrationType, setIntegrationType] = useState("");
    const [integrationName, setIntegrationName] = useState("");
    const [status, setStatus] = useState("ACTIVE");
    const [configuration, setConfiguration] = useState("");

    useEffect(() => {
        loadIntegrations();
        loadChatbots();
    }, []);

    const loadIntegrations = async () => {
        try {
            const data = await getIntegrations();
            setIntegrations(data);
        } catch (error) {
            console.error("Error loading integrations:", error);
        }
    };

    const loadChatbots = async () => {
        try {
            const data = await getChatBots();
            setChatbots(data);
        } catch (error) {
            console.error("Error loading chatbots:", error);
        }
    };

    const openAddForm = () => {
        setEditId(null);
        setBotId("");
        setIntegrationType("");
        setIntegrationName("");
        setStatus("ACTIVE");
        setConfiguration("");
        setShowForm(true);
    };

    const handleEdit = (integration) => {

        setEditId(integration.id);

        setBotId(integration.botId || "");

        setIntegrationType(
            integration.integrationType || ""
        );

        setIntegrationName(
            integration.integrationName ||
            integration.name ||
            ""
        );

        setStatus(
            integration.status || "ACTIVE"
        );

        setConfiguration(
            integration.configuration || ""
        );

        setShowForm(true);
    };

    const closeForm = () => {

        setShowForm(false);
        setEditId(null);

        setBotId("");
        setIntegrationType("");
        setIntegrationName("");
        setStatus("ACTIVE");
        setConfiguration("");
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!botId) {
            alert("Please select a ChatBot");
            return;
        }

        try {

            const data = {
                botId: Number(botId),
                integrationType: integrationType,
                integrationName: integrationName,
                status: status,
                configuration: configuration
            };

            let savedIntegration;

            if (editId) {

                savedIntegration =
                    await updateIntegration(
                        editId,
                        data
                    );

                setIntegrations(
                    integrations.map((integration) =>
                        integration.id === editId
                            ? savedIntegration
                            : integration
                    )
                );

                alert(
                    "Integration updated successfully"
                );

            } else {

                savedIntegration =
                    await addIntegration(data);

                setIntegrations([
                    ...integrations,
                    savedIntegration
                ]);

                alert(
                    "Integration added successfully"
                );
            }

            closeForm();

        } catch (error) {

            console.error(
                "Integration error:",
                error
            );

            console.error(
                "STATUS:",
                error.response?.status
            );

            console.error(
                "DATA:",
                error.response?.data
            );

            alert(
                editId
                    ? "Failed to update integration"
                    : "Failed to add integration"
            );
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this integration?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteIntegration(id);

            setIntegrations(
                integrations.filter(
                    (integration) =>
                        integration.id !== id
                )
            );

            alert(
                "Integration deleted successfully"
            );

        } catch (error) {

            console.error(
                "Delete integration error:",
                error
            );

            alert(
                "Failed to delete integration"
            );
        }
    };


    return (

        <div className="integration-management-page">

            {/* HEADER */}

            <div className="integration-page-header">

                <div>

                    <h1>
                        Integration Management
                    </h1>

                    <p>
                        Manage external integrations
                        connected to your chatbots
                    </p>

                </div>

                <button
                    className="integration-back-button"
                    onClick={onBack}
                >
                    ← Back to Dashboard
                </button>

            </div>


            {/* SUMMARY */}

            <div className="integration-action-bar">

                <div className="integration-summary">

                    <div className="integration-summary-icon">
                        🔗
                    </div>

                    <div>

                        <strong>
                            {integrations.length}
                        </strong>

                        <span>
                            Total Integrations
                        </span>

                    </div>

                </div>


                <button
                    className="add-integration-button"
                    onClick={openAddForm}
                >
                    + Add Integration
                </button>

            </div>


            {/* FORM */}

            {showForm && (

                <div className="integration-form-card">

                    <div className="integration-form-header">

                        <div>

                            <h2>
                                {editId
                                    ? "Edit Integration"
                                    : "Add New Integration"}
                            </h2>

                            <p>
                                Connect an external
                                service to your chatbot
                            </p>

                        </div>

                        <button
                            className="integration-close-button"
                            onClick={closeForm}
                        >
                            ×
                        </button>

                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="integration-form-grid">

                            {/* CHATBOT */}

                            <div className="integration-form-group">

                                <label>
                                    ChatBot
                                </label>

                                <select
                                    value={botId}
                                    onChange={(e) =>
                                        setBotId(
                                            e.target.value
                                        )
                                    }
                                    required
                                >

                                    <option value="">
                                        Select ChatBot
                                    </option>

                                    {chatbots.map(
                                        (bot) => (

                                            <option
                                                key={bot.id}
                                                value={bot.id}
                                            >
                                                {bot.name}
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>


                            {/* INTEGRATION NAME */}

                            <div className="integration-form-group">

                                <label>
                                    Integration Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Example: Google Calendar"
                                    value={integrationName}
                                    onChange={(e) =>
                                        setIntegrationName(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            {/* TYPE */}

                            <div className="integration-form-group">

                                <label>
                                    Integration Type
                                </label>

                                <select
                                    value={integrationType}
                                    onChange={(e) =>
                                        setIntegrationType(
                                            e.target.value
                                        )
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Integration
                                    </option>

                                    <option value="API">
                                        API
                                    </option>

                                    <option value="WEBHOOK">
                                        Webhook
                                    </option>

                                    <option value="GOOGLE">
                                        Google
                                    </option>

                                    <option value="DATABASE">
                                        Database
                                    </option>

                                    <option value="PAYMENT">
                                        Payment
                                    </option>

                                    <option value="CRM">
                                        CRM
                                    </option>

                                    <option value="OTHER">
                                        Other
                                    </option>

                                </select>

                            </div>


                            {/* STATUS */}

                            <div className="integration-form-group">

                                <label>
                                    Status
                                </label>

                                <select
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="ACTIVE">
                                        Active
                                    </option>

                                    <option value="INACTIVE">
                                        Inactive
                                    </option>

                                </select>

                            </div>


                            {/* CONFIGURATION */}

                            <div className="integration-form-group full-width">

                                <label>
                                    Configuration
                                </label>

                                <textarea
                                    placeholder="Enter integration configuration"
                                    value={configuration}
                                    onChange={(e) =>
                                        setConfiguration(
                                            e.target.value
                                        )
                                    }
                                    rows="4"
                                />

                            </div>

                        </div>


                        <div className="integration-form-buttons">

                            <button
                                type="button"
                                className="integration-cancel-button"
                                onClick={closeForm}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="integration-save-button"
                            >
                                {editId
                                    ? "Update Integration"
                                    : "Save Integration"}
                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* TABLE */}

            <div className="integration-table-card">

                <div className="integration-table-header">

                    <div>

                        <h2>
                            Configured Integrations
                        </h2>

                        <p>
                            View and manage your
                            chatbot integrations
                        </p>

                    </div>

                </div>


                {integrations.length === 0 ? (

                    <div className="integration-empty">

                        <div className="integration-empty-icon">
                            🔗
                        </div>

                        <h3>
                            No integrations found
                        </h3>

                        <p>
                            Add an integration to connect
                            your chatbot with external
                            services.
                        </p>

                        <button
                            onClick={openAddForm}
                        >
                            + Add Integration
                        </button>

                    </div>

                ) : (

                    <div className="integration-table-wrapper">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        ID
                                    </th>

                                    <th>
                                        ChatBot
                                    </th>

                                    <th>
                                        Integration
                                    </th>

                                    <th>
                                        Type
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {integrations.map(
                                    (integration) => (

                                        <tr
                                            key={
                                                integration.id
                                            }
                                        >

                                            <td>
                                                #
                                                {
                                                    integration.id
                                                }
                                            </td>

                                            <td>

                                                <div className="integration-bot">

                                                    <div className="integration-bot-icon">
                                                        🤖
                                                    </div>

                                                    <span>
                                                        {
                                                            integration.botName ||
                                                            `Bot #${integration.botId}`
                                                        }
                                                    </span>

                                                </div>

                                            </td>

                                            <td>

                                                <div className="integration-name">

                                                    <strong>
                                                        {
                                                            integration.integrationName ||
                                                            integration.name ||
                                                            "-"
                                                        }
                                                    </strong>

                                                </div>

                                            </td>

                                            <td>

                                                <span className="integration-type-badge">

                                                    {
                                                        integration.integrationType ||
                                                        "-"
                                                    }

                                                </span>

                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        integration.status ===
                                                        "ACTIVE"
                                                            ? "integration-status active"
                                                            : "integration-status inactive"
                                                    }
                                                >

                                                    <span></span>

                                                    {
                                                        integration.status ||
                                                        "UNKNOWN"
                                                    }

                                                </span>

                                            </td>

                                            <td>

                                                <div className="integration-actions">

                                                    <button
                                                        className="integration-edit-button"
                                                        onClick={() =>
                                                            handleEdit(
                                                                integration
                                                            )
                                                        }
                                                    >
                                                        ✏️ Edit
                                                    </button>

                                                    <button
                                                        className="integration-delete-button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                integration.id
                                                            )
                                                        }
                                                    >
                                                        🗑 Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default IntegrationManagement;