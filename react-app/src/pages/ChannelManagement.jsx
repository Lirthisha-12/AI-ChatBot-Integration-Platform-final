import React, { useEffect, useState } from "react";
import {
    getChannels,
    addChannel,
    updateChannel,
    deleteChannel,
    getChatBots
} from "../services/api";

import "../styles/channelmanagement.css";

function ChannelManagement({ onBack }) {

    const [channels, setChannels] = useState([]);
    const [chatbots, setChatbots] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);

    const [botId, setBotId] = useState("");
    const [channelName, setChannelName] = useState("");
    const [channelType, setChannelType] = useState("");
    const [status, setStatus] = useState("ACTIVE");

    useEffect(() => {
        loadChannels();
        loadChatbots();
    }, []);

    const loadChannels = async () => {
        try {

            const data = await getChannels();

            setChannels(data);

        } catch (error) {

            console.error("Error loading channels:", error);

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


    /* ================================
       OPEN ADD FORM
    ================================= */

    const openAddForm = () => {

        setEditId(null);

        setBotId("");
        setChannelName("");
        setChannelType("");
        setStatus("ACTIVE");

        setShowForm(true);
    };


    /* ================================
       EDIT CHANNEL
    ================================= */

    const handleEdit = (channel) => {

        setEditId(channel.id);

        setBotId(channel.botId || "");
        setChannelName(
            channel.channelName ||
            channel.name ||
            ""
        );

        setChannelType(
            channel.channelType ||
            channel.type ||
            ""
        );

        setStatus(
            channel.status ||
            "ACTIVE"
        );

        setShowForm(true);
    };


    /* ================================
       SAVE CHANNEL
    ================================= */

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!botId) {
            alert("Please select a chatbot");
            return;
        }

        try {

            const data = {
                botId: Number(botId),
                channelName: channelName,
                channelType: channelType,
                status: status
            };

            let savedChannel;

            if (editId) {

                savedChannel = await updateChannel(
                    editId,
                    data
                );

                setChannels(
                    channels.map((channel) =>
                        channel.id === editId
                            ? savedChannel
                            : channel
                    )
                );

                alert("Channel updated successfully");

            } else {

                savedChannel = await addChannel(data);

                setChannels([
                    ...channels,
                    savedChannel
                ]);

                alert("Channel added successfully");
            }

            closeForm();

        } catch (error) {

            console.error(
                "Channel save error:",
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
                    ? "Failed to update channel"
                    : "Failed to add channel"
            );
        }
    };


    /* ================================
       DELETE
    ================================= */

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this channel?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteChannel(id);

            setChannels(
                channels.filter(
                    (channel) =>
                        channel.id !== id
                )
            );

            alert("Channel deleted successfully");

        } catch (error) {

            console.error(
                "Delete channel error:",
                error
            );

            alert("Failed to delete channel");
        }
    };


    /* ================================
       CLOSE FORM
    ================================= */

    const closeForm = () => {

        setShowForm(false);

        setEditId(null);

        setBotId("");
        setChannelName("");
        setChannelType("");
        setStatus("ACTIVE");
    };


    return (

        <div className="channel-management-page">

            {/* ================================
                HEADER
            ================================= */}

            <div className="channel-page-header">

                <div>

                    <h1>
                        Channel Management
                    </h1>

                    <p>
                        Manage chatbot deployment channels
                    </p>

                </div>

                <button
                    className="channel-back-button"
                    onClick={onBack}
                >
                    ← Back to Dashboard
                </button>

            </div>


            {/* ================================
                TOP ACTION BAR
            ================================= */}

            <div className="channel-action-bar">

                <div className="channel-summary">

                    <div className="channel-summary-icon">
                        📡
                    </div>

                    <div>

                        <strong>
                            {channels.length}
                        </strong>

                        <span>
                            Total Channels
                        </span>

                    </div>

                </div>


                <button
                    className="add-channel-button"
                    onClick={openAddForm}
                >
                    + Add Channel
                </button>

            </div>


            {/* ================================
                FORM
            ================================= */}

            {showForm && (

                <div className="channel-form-card">

                    <div className="channel-form-header">

                        <div>

                            <h2>
                                {editId
                                    ? "Edit Channel"
                                    : "Add New Channel"}
                            </h2>

                            <p>
                                Configure a deployment
                                channel for your chatbot
                            </p>

                        </div>

                        <button
                            className="channel-close-button"
                            onClick={closeForm}
                        >
                            ×
                        </button>

                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="channel-form-grid">


                            {/* CHATBOT */}

                            <div className="channel-form-group">

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


                            {/* CHANNEL NAME */}

                            <div className="channel-form-group">

                                <label>
                                    Channel Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Example: Website Chat"
                                    value={channelName}
                                    onChange={(e) =>
                                        setChannelName(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            {/* CHANNEL TYPE */}

                            <div className="channel-form-group">

                                <label>
                                    Channel Type
                                </label>

                                <select
                                    value={channelType}
                                    onChange={(e) =>
                                        setChannelType(
                                            e.target.value
                                        )
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Channel
                                    </option>

                                    <option value="WEB">
                                        🌐 Website
                                    </option>

                                    <option value="WHATSAPP">
                                        💬 WhatsApp
                                    </option>

                                    <option value="TELEGRAM">
                                        ✈️ Telegram
                                    </option>

                                    <option value="FACEBOOK">
                                        📘 Facebook
                                    </option>

                                    <option value="INSTAGRAM">
                                        📷 Instagram
                                    </option>

                                    <option value="SLACK">
                                        💼 Slack
                                    </option>

                                </select>

                            </div>


                            {/* STATUS */}

                            <div className="channel-form-group">

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

                        </div>


                        <div className="channel-form-buttons">

                            <button
                                type="button"
                                className="channel-cancel-button"
                                onClick={closeForm}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="channel-save-button"
                            >
                                {editId
                                    ? "Update Channel"
                                    : "Save Channel"}
                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* ================================
                CHANNEL TABLE
            ================================= */}

            <div className="channel-table-card">

                <div className="channel-table-header">

                    <div>

                        <h2>
                            Deployment Channels
                        </h2>

                        <p>
                            Configure and manage your
                            chatbot channels
                        </p>

                    </div>

                </div>


                {channels.length === 0 ? (

                    <div className="channel-empty">

                        <div className="channel-empty-icon">
                            📡
                        </div>

                        <h3>
                            No channels found
                        </h3>

                        <p>
                            Add a channel to connect
                            your chatbot to a platform.
                        </p>

                        <button
                            onClick={openAddForm}
                        >
                            + Add Channel
                        </button>

                    </div>

                ) : (

                    <div className="channel-table-wrapper">

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
                                        Channel Name
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

                                {channels.map(
                                    (channel) => (

                                        <tr
                                            key={
                                                channel.id
                                            }
                                        >

                                            <td>
                                                #
                                                {
                                                    channel.id
                                                }
                                            </td>

                                            <td>

                                                <div className="channel-bot">

                                                    <div className="channel-bot-icon">
                                                        🤖
                                                    </div>

                                                    <span>
                                                        {
                                                            channel.botName ||
                                                            `Bot #${channel.botId}`
                                                        }
                                                    </span>

                                                </div>

                                            </td>

                                            <td>
                                                {
                                                    channel.channelName ||
                                                    channel.name ||
                                                    "-"
                                                }
                                            </td>

                                            <td>

                                                <span className="channel-type-badge">

                                                    {
                                                        channel.channelType ||
                                                        channel.type ||
                                                        "-"
                                                    }

                                                </span>

                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        channel.status ===
                                                        "ACTIVE"
                                                            ? "channel-status active"
                                                            : "channel-status inactive"
                                                    }
                                                >

                                                    <span></span>

                                                    {
                                                        channel.status ||
                                                        "UNKNOWN"
                                                    }

                                                </span>

                                            </td>

                                            <td>

                                                <div className="channel-actions">

                                                    <button
                                                        className="channel-edit-button"
                                                        onClick={() =>
                                                            handleEdit(
                                                                channel
                                                            )
                                                        }
                                                    >
                                                        ✏️ Edit
                                                    </button>

                                                    <button
                                                        className="channel-delete-button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                channel.id
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

export default ChannelManagement;