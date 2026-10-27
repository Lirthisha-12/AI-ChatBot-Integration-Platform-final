import React, { useEffect, useState } from "react";

import {
    getConversations,
    createConversation,
    updateConversation,
    deleteConversation,
    getChatBots
} from "../services/api";

import "../styles/ConversationManagement.css";


function ConversationManagement({ onBack }) {

    const [conversations, setConversations] = useState([]);
    const [chatbots, setChatbots] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);

    const [botId, setBotId] = useState("");
    const [userId, setUserId] = useState("1");
    const [channelId, setChannelId] = useState("WEB");
    const [sessionId, setSessionId] = useState("");
    const [status, setStatus] = useState("ACTIVE");
    const [satisfaction, setSatisfaction] = useState(0);
    const [agentInvolved, setAgentInvolved] = useState(false);
    const [metadata, setMetadata] = useState("");

    // =====================================
    // LOAD DATA
    // =====================================

    useEffect(() => {
        loadConversations();
        loadChatBots();
    }, []);


    const loadConversations = async () => {

        try {

            const data = await getConversations();

            setConversations(data);

        } catch (error) {

            console.error(
                "Error loading conversations:",
                error
            );

        }
    };


    const loadChatBots = async () => {

        try {

            const data = await getChatBots();

            setChatbots(data);

        } catch (error) {

            console.error(
                "Error loading chatbots:",
                error
            );

        }
    };


    // =====================================
    // CLEAR FORM
    // =====================================

    const clearForm = () => {

        setBotId("");
        setUserId("1");
        setChannelId("WEB");
        setSessionId("");
        setStatus("ACTIVE");
        setSatisfaction(0);
        setAgentInvolved(false);
        setMetadata("");

        setEditId(null);
    };


    // =====================================
    // CREATE / UPDATE
    // =====================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const conversationData = {

                botId: Number(botId),

                userId: Number(userId),

                channelId: channelId,

                sessionId:
                    sessionId ||
                    "session-" + Date.now(),

                status: status,

                satisfaction:
                    Number(satisfaction),

                agentInvolved:
                    agentInvolved,

                metadata:
                    metadata

            };


            if (editId) {

                const updated =
                    await updateConversation(
                        editId,
                        conversationData
                    );


                setConversations(
                    conversations.map(
                        (conversation) =>
                            conversation.id === editId
                                ? updated
                                : conversation
                    )
                );


                alert(
                    "Conversation updated successfully"
                );

            } else {

                const saved =
                    await createConversation(
                        conversationData
                    );


                setConversations([
                    ...conversations,
                    saved
                ]);


                alert(
                    "Conversation created successfully"
                );
            }


            clearForm();

            setShowForm(false);


        } catch (error) {

            console.error(
                "Conversation error:",
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
                "Failed to save conversation"
            );
        }
    };


    // =====================================
    // EDIT
    // =====================================

    const handleEdit = (conversation) => {

        setEditId(conversation.id);

        setBotId(
            conversation.botId || ""
        );

        setUserId(
            conversation.userId || "1"
        );

        setChannelId(
            conversation.channelId || "WEB"
        );

        setSessionId(
            conversation.sessionId || ""
        );

        setStatus(
            conversation.status || "ACTIVE"
        );

        setSatisfaction(
            conversation.satisfaction || 0
        );

        setAgentInvolved(
            conversation.agentInvolved || false
        );

        setMetadata(
            conversation.metadata || ""
        );

        setShowForm(true);
    };


    // =====================================
    // DELETE
    // =====================================

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this conversation?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            await deleteConversation(id);


            setConversations(
                conversations.filter(
                    (conversation) =>
                        conversation.id !== id
                )
            );


            alert(
                "Conversation deleted successfully"
            );


        } catch (error) {

            console.error(
                "Delete error:",
                error
            );

            alert(
                "Failed to delete conversation"
            );
        }
    };



    // =====================================
    // UI
    // =====================================

    return (

        <div className="conversation-management-page">


            {/* BACK */}

            <button
                className="conversation-back-button"
                onClick={onBack}
            >
                ← Back to Dashboard
            </button>


            {/* HEADER */}

            <div className="conversation-header">

                <div>

                    <h1>
                        Conversation Management
                    </h1>

                    <p>
                        Monitor and manage chatbot conversations
                    </p>

                </div>


                <button
                    className="add-conversation-button"
                    onClick={() => {

                        clearForm();

                        setShowForm(true);

                    }}
                >
                    + New Conversation
                </button>

            </div>


            {/* FORM */}

            {showForm && (

                <div className="conversation-form-card">

                    <div className="conversation-form-heading">

                        <h2>
                            {editId
                                ? "Edit Conversation"
                                : "Create Conversation"}
                        </h2>

                        <p>
                            Configure conversation details
                        </p>

                    </div>


                    <form
                        className="conversation-form"
                        onSubmit={handleSubmit}
                    >


                        {/* BOT */}

                        <div className="conversation-form-group">

                            <label>
                                ChatBot
                            </label>

<select
    value={botId}
    onChange={(e) => setBotId(e.target.value)}
    required
>
    <option value="">Select ChatBot</option>

    {chatbots.map((bot) => (
        <option key={bot.id} value={bot.id}>
            {bot.name}
        </option>
    ))}
</select>
                        </div>


                        {/* USER */}

                        <div className="conversation-form-group">

                            <label>
                                User ID
                            </label>

                            <input
                                type="number"
                                value={userId}
                                onChange={(e) =>
                                    setUserId(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        {/* CHANNEL */}

                        <div className="conversation-form-group">

                            <label>
                                Channel
                            </label>

                            <select
                                value={channelId}
                                onChange={(e) =>
                                    setChannelId(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="WEB">
                                    Web
                                </option>

                                <option value="WHATSAPP">
                                    WhatsApp
                                </option>

                                <option value="TELEGRAM">
                                    Telegram
                                </option>

                                <option value="FACEBOOK">
                                    Facebook
                                </option>

                                <option value="INSTAGRAM">
                                    Instagram
                                </option>

                                <option value="SLACK">
                                    Slack
                                </option>

                            </select>

                        </div>


                        {/* SESSION */}

                        <div className="conversation-form-group">

                            <label>
                                Session ID
                            </label>

                            <input
                                type="text"
                                placeholder="session-12345"
                                value={sessionId}
                                onChange={(e) =>
                                    setSessionId(
                                        e.target.value
                                    )
                                }
                            />

                        </div>


                        {/* STATUS */}

                        <div className="conversation-form-group">

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

                                <option value="COMPLETED">
                                    Completed
                                </option>

                                <option value="CLOSED">
                                    Closed
                                </option>

                                <option value="TRANSFERRED">
                                    Transferred
                                </option>

                            </select>

                        </div>


                        {/* SATISFACTION */}

                        <div className="conversation-form-group">

                            <label>
                                Satisfaction
                            </label>

                            <select
                                value={satisfaction}
                                onChange={(e) =>
                                    setSatisfaction(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="0">
                                    Not Rated
                                </option>

                                <option value="1">
                                    ★ 1
                                </option>

                                <option value="2">
                                    ★★ 2
                                </option>

                                <option value="3">
                                    ★★★ 3
                                </option>

                                <option value="4">
                                    ★★★★ 4
                                </option>

                                <option value="5">
                                    ★★★★★ 5
                                </option>

                            </select>

                        </div>


                        {/* AGENT */}

                        <div className="conversation-agent-option">

                            <label>

                                <input
                                    type="checkbox"
                                    checked={
                                        agentInvolved
                                    }
                                    onChange={(e) =>
                                        setAgentInvolved(
                                            e.target.checked
                                        )
                                    }
                                />

                                Agent involved

                            </label>

                        </div>


                        {/* METADATA */}

                        <div className="conversation-form-group full-width">

                            <label>
                                Metadata
                            </label>

                            <textarea
                                placeholder="Additional conversation information..."
                                value={metadata}
                                onChange={(e) =>
                                    setMetadata(
                                        e.target.value
                                    )
                                }
                            />

                        </div>


                        {/* ACTIONS */}

                        <div className="conversation-form-actions">

                            <button
                                type="submit"
                                className="conversation-save-button"
                            >

                                {editId
                                    ? "Update Conversation"
                                    : "Create Conversation"}

                            </button>


                            <button
                                type="button"
                                className="conversation-cancel-button"
                                onClick={() => {

                                    clearForm();

                                    setShowForm(false);

                                }}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* LIST */}

            <div className="conversation-list-card">

                <div className="conversation-list-header">

                    <div>

                        <h2>
                            Conversations
                        </h2>

                        <p>
                            All chatbot conversation sessions
                        </p>

                    </div>


                    <div className="conversation-count">

                        {conversations.length}{" "}
                        {conversations.length === 1
                            ? "Conversation"
                            : "Conversations"}

                    </div>

                </div>


                {conversations.length === 0 ? (

                    <div className="conversation-empty">

                        <div className="conversation-empty-icon">
                            💬
                        </div>

                        <h3>
                            No conversations found
                        </h3>

                        <p>
                            Conversations will appear here once users start chatting.
                        </p>

                    </div>

                ) : (

                    <div className="conversation-table-wrapper">

                        <table className="conversation-table">

                            <thead>

                                <tr>

                                    <th>
                                        ChatBot
                                    </th>

                                    <th>
                                        User
                                    </th>

                                    <th>
                                        Channel
                                    </th>

                                    <th>
                                        Session
                                    </th>

                                    <th>
                                        Start Time
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Rating
                                    </th>

                                    <th>
                                        Agent
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {conversations.map(
                                    (conversation) => (

                                        <tr
                                            key={
                                                conversation.id
                                            }
                                        >

                                            <td>

                                                <strong>

                                                    {conversation.botName ||
                                                        chatbots.find(
                                                            (bot) =>
                                                                bot.id ===
                                                                conversation.botId
                                                        )?.name ||
                                                        `Bot ${conversation.botId}`}

                                                </strong>

                                            </td>


                                            <td>

                                                <span className="conversation-user">

                                                    {conversation.username ||
                                                        `User ${conversation.userId}`}

                                                </span>

                                            </td>


                                            <td>

                                                <span className="conversation-channel">

                                                    {conversation.channelId ||
                                                        "-"}

                                                </span>

                                            </td>


                                            <td>

                                                <span className="conversation-session">

                                                    {conversation.sessionId ||
                                                        "-"}

                                                </span>

                                            </td>


                                            <td>

                                                <span className="conversation-date">

                                                    {conversation.startTime
                                                        ? new Date(
                                                            conversation.startTime
                                                        ).toLocaleString()
                                                        : "-"}

                                                </span>

                                            </td>


                                            <td>

                                                <span
                                                    className={`conversation-status ${
                                                        conversation.status
                                                            ?.toLowerCase()
                                                    }`}
                                                >

                                                    {conversation.status ||
                                                        "UNKNOWN"}

                                                </span>

                                            </td>


                                            <td>

                                                <span className="conversation-rating">

                                                    {conversation.satisfaction > 0
                                                        ? "★".repeat(
                                                            conversation.satisfaction
                                                        )
                                                        : "Not rated"}

                                                </span>

                                            </td>


                                            <td>

                                                {conversation.agentInvolved ? (

                                                    <span className="agent-yes">
                                                        Yes
                                                    </span>

                                                ) : (

                                                    <span className="agent-no">
                                                        No
                                                    </span>

                                                )}

                                            </td>


                                            <td>

                                                <div className="conversation-actions">

                                                    <button
                                                        className="conversation-edit-button"
                                                        onClick={() =>
                                                            handleEdit(
                                                                conversation
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        className="conversation-delete-button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                conversation.id
                                                            )
                                                        }
                                                    >
                                                        Delete
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


export default ConversationManagement;