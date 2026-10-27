import React, { useEffect, useState } from "react";
import {
    getChatBots,
    deleteChatBot,
    addChatBot,
    updateBot
} from "../services/api";

import "../styles/Chatbots.css";

function ChatBots({onBack}) {

    const [chatbots, setChatbots] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedBot, setSelectedBot] = useState(null);

    const [editId, setEditId] = useState(null);
    const [botName, setBotName] = useState("");
    const [platform, setPlatform] = useState("");
    const [intent, setIntent] = useState("");
    const [response, setResponse] = useState("");

    const [search, setSearch] = useState("");

    useEffect(() => {
        loadChatBots();
    }, []);

    const loadChatBots = async () => {
        try {
            const data = await getChatBots();
            setChatbots(data);
        } catch (error) {
            console.error("Error fetching chatbots:", error);
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this chatbot?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteChatBot(id);

            setChatbots(
                chatbots.filter((bot) => bot.id !== id)
            );

            alert("ChatBot deleted successfully");

        } catch (error) {

            console.error("Delete error:", error);

            alert("Failed to delete chatbot");
        }
    };

    const handleView = (bot) => {
        setSelectedBot(bot);
    };

    const handleEdit = (bot) => {

        setEditId(bot.id);

        setBotName(bot.name || "");
        setPlatform(bot.deploymentChannels || "");
        setIntent(bot.configuration || "");
        setResponse(bot.description || "");

        setShowForm(true);
    };

    const handleAddChatBot = async (e) => {

        e.preventDefault();

        try {

            const botData = {
                ownerId: 1,
                name: botName,
                description: response,
                configuration: intent,
                nlpModel: "Default",
                deploymentChannels: platform,
                status: "ACTIVE",
                version: "1.0"
            };

            let savedBot;

            if (editId) {

                savedBot = await updateBot(editId, botData);

                setChatbots(
                    chatbots.map((bot) =>
                        bot.id === editId ? savedBot : bot
                    )
                );

                alert("ChatBot updated successfully");

            } else {

                savedBot = await addChatBot(botData);

                setChatbots([
                    ...chatbots,
                    savedBot
                ]);

                alert("ChatBot added successfully");
            }

            resetForm();

        } catch (error) {

            console.error("Bot error:", error);

            alert("Failed to save chatbot");
        }
    };

    const resetForm = () => {

        setBotName("");
        setPlatform("");
        setIntent("");
        setResponse("");

        setEditId(null);
        setShowForm(false);
    };

    const openAddForm = () => {

        setEditId(null);
        setBotName("");
        setPlatform("");
        setIntent("");
        setResponse("");

        setShowForm(true);
    };

    const filteredBots = chatbots.filter((bot) =>
        bot.name?.toLowerCase().includes(search.toLowerCase()) ||
        bot.deploymentChannels?.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="management-page">

            {/* PAGE HEADER */}

            <div className="management-header">

                <div>
                    <h1>ChatBot Management</h1>

                    <p>
                        Create, update and manage your configured chatbots.
                    </p>
                </div>

                <button
                    className="primary-btn"
                    onClick={openAddForm}
                >
                    + Add ChatBot
                </button>


            </div>
            <button
            className="back-button"
            onClick={onBack}
        >
            ← Back to Dashboard
        </button>

            {/* SEARCH / FILTER */}

            <div className="management-toolbar">

                <div className="search-box">
                    🔍
                    <input
                        type="text"
                        placeholder="Search chatbots..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />
                </div>

                <div className="bot-count">
                    {filteredBots.length} ChatBot
                    {filteredBots.length !== 1 ? "s" : ""}
                </div>

            </div>


            {/* TABLE CARD */}

            <div className="management-card">

                {filteredBots.length === 0 ? (

                    <div className="empty-state">

                        <div className="empty-icon">
                            🤖
                        </div>

                        <h3>No ChatBots Found</h3>

                        <p>
                            Create your first chatbot to get started.
                        </p>

                        <button
                            className="primary-btn"
                            onClick={openAddForm}
                        >
                            + Add ChatBot
                        </button>

                    </div>

                ) : (

                    <div className="table-wrapper">

                        <table className="management-table">

                            <thead>

                                <tr>
                                    <th>Bot Name</th>
                                    <th>Platform</th>
                                    <th>Intent</th>
                                    <th>Response</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {filteredBots.map((bot) => (

                                    <tr key={bot.id}>

                                        <td>

                                            <div className="bot-name-cell">

                                                <div className="bot-avatar">
                                                    🤖
                                                </div>

                                                <div>
                                                    <strong>
                                                        {bot.name}
                                                    </strong>

                                                    <small>
                                                        Version {bot.version || "1.0"}
                                                    </small>
                                                </div>

                                            </div>

                                        </td>


                                        <td>

                                            <span className="platform-badge">
                                                {bot.deploymentChannels}
                                            </span>

                                        </td>


                                        <td>
                                            {bot.configuration || "-"}
                                        </td>


                                        <td className="response-cell">
                                            {bot.description || "-"}
                                        </td>


                                        <td>

                                            <span
                                                className={
                                                    bot.status === "ACTIVE"
                                                        ? "status-badge active"
                                                        : "status-badge inactive"
                                                }
                                            >
                                                <span></span>
                                                {bot.status}
                                            </span>

                                        </td>


                                        <td>

                                            <div className="action-buttons">

                                                <button
                                                    className="view-btn"
                                                    onClick={() =>
                                                        handleView(bot)
                                                    }
                                                >
                                                    View
                                                </button>

                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        handleEdit(bot)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleDelete(bot.id)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


            {/* ADD / EDIT MODAL */}

            {showForm && (

                <div className="modal-overlay">

                    <div className="modal-box">

                        <div className="modal-header">

                            <div>

                                <h2>
                                    {editId
                                        ? "Edit ChatBot"
                                        : "Add New ChatBot"}
                                </h2>

                                <p>
                                    Configure your chatbot details.
                                </p>

                            </div>

                            <button
                                className="close-btn"
                                onClick={resetForm}
                            >
                                ×
                            </button>

                        </div>


                        <form
                            className="bot-form"
                            onSubmit={handleAddChatBot}
                        >

                            <div className="form-group">

                                <label>
                                    Bot Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter chatbot name"
                                    value={botName}
                                    onChange={(e) =>
                                        setBotName(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Platform
                                </label>

                                <select
                                    value={platform}
                                    onChange={(e) =>
                                        setPlatform(e.target.value)
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Platform
                                    </option>

                                    <option value="WhatsApp">
                                        WhatsApp
                                    </option>

                                    <option value="Website">
                                        Website
                                    </option>

                                    <option value="Telegram">
                                        Telegram
                                    </option>

                                    <option value="Facebook">
                                        Facebook
                                    </option>

                                    <option value="Instagram">
                                        Instagram
                                    </option>

                                    <option value="Slack">
                                        Slack
                                    </option>

                                </select>

                            </div>


                            <div className="form-group">

                                <label>
                                    Intent
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter chatbot intent"
                                    value={intent}
                                    onChange={(e) =>
                                        setIntent(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Response
                                </label>

                                <textarea
                                    placeholder="Enter chatbot response"
                                    value={response}
                                    onChange={(e) =>
                                        setResponse(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            <div className="form-actions">

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="primary-btn"
                                >
                                    {editId
                                        ? "Update ChatBot"
                                        : "Add ChatBot"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}


            {/* VIEW DETAILS MODAL */}

            {selectedBot && (

                <div className="modal-overlay">

                    <div className="modal-box details-modal">

                        <div className="modal-header">

                            <div className="details-title">

                                <div className="large-bot-avatar">
                                    🤖
                                </div>

                                <div>

                                    <h2>
                                        {selectedBot.name}
                                    </h2>

                                    <span className="status-badge active">
                                        <span></span>
                                        {selectedBot.status}
                                    </span>

                                </div>

                            </div>

                            <button
                                className="close-btn"
                                onClick={() =>
                                    setSelectedBot(null)
                                }
                            >
                                ×
                            </button>

                        </div>


                        <div className="details-grid">

                            <div>
                                <label>Description</label>
                                <p>
                                    {selectedBot.description || "-"}
                                </p>
                            </div>

                            <div>
                                <label>Platform</label>
                                <p>
                                    {selectedBot.deploymentChannels || "-"}
                                </p>
                            </div>

                            <div>
                                <label>Intent</label>
                                <p>
                                    {selectedBot.configuration || "-"}
                                </p>
                            </div>

                            <div>
                                <label>NLP Model</label>
                                <p>
                                    {selectedBot.nlpModel || "-"}
                                </p>
                            </div>

                            <div>
                                <label>Version</label>
                                <p>
                                    {selectedBot.version || "-"}
                                </p>
                            </div>

                        </div>


                        <div className="details-footer">

                            <button
                                className="cancel-btn"
                                onClick={() =>
                                    setSelectedBot(null)
                                }
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default ChatBots;