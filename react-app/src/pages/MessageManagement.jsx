import React, { useEffect, useState } from "react";
import {
    getMessages,
    addMessage,
    deleteMessage,
    getConversations
} from "../services/api";

import "../styles/MessageManagement.css";

function MessageManagement() {

    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [conversationId, setConversationId] = useState("");
    const [senderId, setSenderId] = useState(1);
    const [senderType, setSenderType] = useState("USER");
    const [content, setContent] = useState("");
    const [messageType, setMessageType] = useState("TEXT");

    useEffect(() => {
        loadMessages();
        loadConversations();
    }, []);

    // ================= LOAD MESSAGES =================

    const loadMessages = async () => {

        try {

            const data = await getMessages();

            setMessages(data);

        } catch (error) {

            console.error("Error loading messages:", error);

        }
    };

    // ================= LOAD CONVERSATIONS =================

    const loadConversations = async () => {

        try {

            const data = await getConversations();

            setConversations(data);

        } catch (error) {

            console.error("Error loading conversations:", error);

        }
    };

    // ================= ADD MESSAGE =================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!conversationId || !content.trim()) {

            alert("Please select a conversation and enter a message.");

            return;
        }

        try {

            const data = {

                conversationId: Number(conversationId),

                senderId: Number(senderId),

                senderType: senderType,

                content: content,

                messageType: messageType,

                nlpResults: "",

                sentiment: "",

                confidence: 0

            };

            const savedMessage = await addMessage(data);

            setMessages((previous) => [
                ...previous,
                savedMessage
            ]);

            setConversationId("");
            setSenderId(1);
            setSenderType("USER");
            setContent("");
            setMessageType("TEXT");

            setShowForm(false);

            alert("Message added successfully");

        } catch (error) {

            console.error("Message error:", error);

            alert("Failed to add message");
        }
    };

    // ================= DELETE MESSAGE =================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this message?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteMessage(id);

            setMessages(
                messages.filter(
                    (message) => message.id !== id
                )
            );

            alert("Message deleted successfully");

        } catch (error) {

            console.error("Delete error:", error);

            alert("Failed to delete message");
        }
    };

    // ================= BACK =================

    const handleBack = () => {

        window.location.reload();

    };

    return (

        <div className="message-management-page">

            {/* HEADER */}

            <div className="message-header">

                <div>

                    <h1>Message Management</h1>

                    <p>
                        Manage chatbot conversation messages
                    </p>

                </div>

                <button
                    className="message-back-button"
                    onClick={handleBack}
                >
                    ← Back to Dashboard
                </button>

            </div>


            {/* ACTION BAR */}

            <div className="message-action-bar">

                <div className="message-count">

                    <span className="count-icon">
                        💬
                    </span>

                    <div>

                        <strong>
                            {messages.length}
                        </strong>

                        <small>
                            Total Messages
                        </small>

                    </div>

                </div>


                <button
                    className="add-message-button"
                    onClick={() => setShowForm(true)}
                >
                    + Add Message
                </button>

            </div>


            {/* FORM */}

            {showForm && (

                <div className="message-form-card">

                    <div className="form-header">

                        <h2>
                            Add New Message
                        </h2>

                        <button
                            onClick={() => setShowForm(false)}
                            className="close-form-button"
                        >
                            ×
                        </button>

                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">

                            {/* CONVERSATION */}

                            <div className="form-group">

                                <label>
                                    Conversation
                                </label>

                                <select
                                    value={conversationId}
                                    onChange={(e) =>
                                        setConversationId(
                                            e.target.value
                                        )
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Conversation
                                    </option>

                                    {conversations.map(
                                        (conversation) => (

                                            <option
                                                key={
                                                    conversation.id
                                                }
                                                value={
                                                    conversation.id
                                                }
                                            >
                                                Conversation #
                                                {
                                                    conversation.id
                                                }
                                                {" - "}
                                                {
                                                    conversation.sessionId ||
                                                    "Session"
                                                }
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>


                            {/* SENDER ID */}

                            <div className="form-group">

                                <label>
                                    Sender ID
                                </label>

                                <input
                                    type="number"
                                    value={senderId}
                                    onChange={(e) =>
                                        setSenderId(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            {/* SENDER TYPE */}

                            <div className="form-group">

                                <label>
                                    Sender Type
                                </label>

                                <select
                                    value={senderType}
                                    onChange={(e) =>
                                        setSenderType(
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="USER">
                                        USER
                                    </option>

                                    <option value="BOT">
                                        BOT
                                    </option>

                                    <option value="AGENT">
                                        AGENT
                                    </option>

                                </select>

                            </div>


                            {/* MESSAGE TYPE */}

                            <div className="form-group">

                                <label>
                                    Message Type
                                </label>

                                <select
                                    value={messageType}
                                    onChange={(e) =>
                                        setMessageType(
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="TEXT">
                                        TEXT
                                    </option>

                                    <option value="IMAGE">
                                        IMAGE
                                    </option>

                                    <option value="FILE">
                                        FILE
                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* CONTENT */}

                        <div className="form-group full-width">

                            <label>
                                Message Content
                            </label>

                            <textarea
                                placeholder="Enter message content..."
                                value={content}
                                onChange={(e) =>
                                    setContent(e.target.value)
                                }
                                rows="4"
                                required
                            />

                        </div>


                        <div className="form-buttons">

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() =>
                                    setShowForm(false)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="save-message-button"
                            >
                                Save Message
                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* MESSAGE TABLE */}

            <div className="message-table-card">

                <div className="table-heading">

                    <div>

                        <h2>
                            Messages
                        </h2>

                        <p>
                            All messages exchanged in conversations
                        </p>

                    </div>

                </div>


                {messages.length === 0 ? (

                    <div className="empty-messages">

                        <div className="empty-icon">
                            💬
                        </div>

                        <h3>
                            No messages found
                        </h3>

                        <p>
                            Messages will appear here once
                            conversations begin.
                        </p>

                    </div>

                ) : (

                    <div className="table-wrapper">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        ID
                                    </th>

                                    <th>
                                        Conversation
                                    </th>

                                    <th>
                                        Sender
                                    </th>

                                    <th>
                                        Type
                                    </th>

                                    <th>
                                        Message
                                    </th>

                                    <th>
                                        Sent At
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {messages.map(
                                    (msg) => (

                                        <tr key={msg.id}>

                                            <td>
                                                #{msg.id}
                                            </td>

                                            <td>

                                                <span className="conversation-badge">

                                                    #
                                                    {
                                                        msg.conversationId
                                                    }

                                                </span>

                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        msg.senderType ===
                                                        "BOT"
                                                            ? "sender bot-sender"
                                                            : "sender user-sender"
                                                    }
                                                >

                                                    {msg.senderType ===
                                                    "BOT"
                                                        ? "🤖 BOT"
                                                        : "👤 " +
                                                          msg.senderType}

                                                </span>

                                            </td>

                                            <td>

                                                <span className="type-badge">

                                                    {
                                                        msg.messageType ||
                                                        "TEXT"
                                                    }

                                                </span>

                                            </td>

                                            <td className="message-content-cell">

                                                {msg.content}

                                            </td>

                                            <td>

                                                {msg.timestamp
                                                    ? new Date(
                                                          msg.timestamp
                                                      ).toLocaleString()
                                                    : msg.createdDate
                                                    ? new Date(
                                                          msg.createdDate
                                                      ).toLocaleString()
                                                    : "-"}

                                            </td>

                                            <td>

                                                <button
                                                    className="delete-message-button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            msg.id
                                                        )
                                                    }
                                                >
                                                    🗑 Delete
                                                </button>

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

export default MessageManagement;