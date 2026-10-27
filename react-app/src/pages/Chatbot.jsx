import React, { useEffect, useState } from "react";

import {
    getChatBots,
    createConversation,
    sendMessage,
    getConversations,
    getMessages
} from "../services/api";
import "../styles/ChatBot.css";
function Chatbot({ bot, onBack }) {

    const [chatbots, setChatbots] = useState([]);
    const [selectedBot, setSelectedBot] = useState(bot || null);

    const [conversationId, setConversationId] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [allMessages, setAllMessages] = useState([]);
    const [typing, setTyping] = useState(false);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        loadBots();
    }, []);

    useEffect(() => {
        if (bot) {
            setSelectedBot(bot);
            startConversation(bot.id);
        }
    }, [bot]);


    const loadBots = async () => {
        try {
            const data = await getChatBots();
            setChatbots(data);
        } catch (error) {
            console.error("Error loading bots:", error);
        }
    };

    const startConversation = async (botId) => {

        try {

            const selected = chatbots.find(
                (item) => item.id === Number(botId)
            );

            if (selected) {
                setSelectedBot(selected);
            }

            const userId = 1;

            const data = {
                botId: Number(botId),
                userId: userId,
                channelId: "WEB",
                sessionId: "session-" + Date.now(),
                status: "ACTIVE",
                satisfaction: 0,
                agentInvolved: false,
                metadata: ""
            };

            const conversation = await createConversation(data);

            setConversationId(conversation.id);
            setSelectedBot(selected || bot);
            setMessages([]);
            setRating(0);

            await loadConversations();

        } catch (error) {

            console.error("Conversation error:", error);

            alert("Failed to start conversation");
        }
    };
    useEffect(() => {
        loadConversations();
    }, []);

    const loadConversations = async () => {
        try {

            const conversationData = await getConversations();
            const messageData = await getMessages();

            setConversations(conversationData);
            setAllMessages(messageData);

        } catch (error) {

            console.error("Error loading conversations:", error);

        }
    };

        const handleSend = async (e) => {

            e.preventDefault();

            if (!message.trim()) {
                return;
            }

            if (!conversationId) {
                alert("Please select a chatbot first");
                return;
            }

            const currentMessage = message;

            setMessage("");
            setTyping(true);

            try {

                const data = {
                    conversationId: conversationId,
                    senderId: 1,
                    senderType: "USER",
                    content: currentMessage,
                    messageType: "TEXT",
                    nlpResults: "",
                    sentiment: "",
                    confidence: 0
                };

                const response = await sendMessage(data);

                setMessages((previous) => [
                    ...previous,
                    {
                        sender: "USER",
                        text: currentMessage
                    },
                    {
                        sender: "BOT",
                        text: response.content
                    }
                ]);
                await loadConversations();

            } catch (error) {

                console.error("Message error:", error);

                alert("Failed to send message");

            } finally {

                setTyping(false);
            }
        };

        const clearConversation = async () => {

            setMessages([]);
            setRating(0);

            if (selectedBot) {
                await startConversation(selectedBot.id);
            }
        };

        const handleLogout = () => {

            localStorage.removeItem("token");
            localStorage.removeItem("role");

            window.location.reload();
        };
    const getConversationTitle = (conversationId) => {

        const conversationMessages = allMessages.filter(
            (msg) => msg.conversationId === conversationId
        );

        const firstUserMessage = conversationMessages.find(
            (msg) => msg.senderType === "USER"
        );

        if (firstUserMessage) {

            return firstUserMessage.content.length > 30
                ? firstUserMessage.content.substring(0, 30) + "..."
                : firstUserMessage.content;
        }

        return "New Conversation";
    };
    const openConversation = (id) => {

        setConversationId(id);

        const conversationMessages = allMessages.filter(
            (msg) => msg.conversationId === id
        );

        const formattedMessages = conversationMessages.map((msg) => ({
            sender: msg.senderType === "USER" ? "USER" : "BOT",
            text: msg.content
        }));

        setMessages(formattedMessages);
    };
    return (

        <div className="chatbot-layout">

            {/* LEFT SIDEBAR */}

            <aside className="chat-sidebar">

                <div className="sidebar-brand">

                    <div className="sidebar-logo">
                        🤖
                    </div>

                    <div>
                        <h2>AI ChatBot</h2>
                        <p>Integration Platform</p>
                    </div>

                </div>


                <button
                    className="new-chat-button"
                    onClick={clearConversation}
                >
                    💬 New Chat
                </button>


 <div className="conversation-list">

    <p className="sidebar-title">
        CONVERSATIONS
    </p>

    {conversations.length === 0 ? (

        <p className="no-conversations">
            No conversations yet
        </p>

    ) : (

        conversations.map((conversation) => (

            <div
                key={conversation.id}
                className={
                    conversation.id === conversationId
                        ? "conversation-item active-conversation"
                        : "conversation-item"
                }
                onClick={() => {
                    openConversation(conversation.id)
                }}
            >

                💬

        <span className="conversation-title">
            {getConversationTitle(conversation.id)}
        </span>

            </div>

        ))

    )}

</div>


                <div className="sidebar-bottom">

                    <div className="user-info">

                        <div className="user-avatar">
                            👤
                        </div>

                        <div>
                            <strong>Hello, User!</strong>
                            <small>user@example.com</small>
                        </div>

                    </div>

                    <div className="online-user">
                        <span></span>
                        Online
                    </div>

                    <button
                        className="sidebar-logout"
                        onClick={handleLogout}
                    >
                        🚪 Logout
                    </button>

                </div>

            </aside>


            {/* CENTER CHAT */}

            <main className="chat-main">

                <div className="chat-header">

                    <div>

                        <h2>
                            Chat with your Assistant 👋
                        </h2>

                        <p>
                            We're here to help you!
                        </p>

                    </div>

                    <div className="online-badge">
                        <span></span>
                        Online
                    </div>

                </div>


                <div className="chat-toolbar">

                    <div className="bot-selector">

                        <div className="small-bot-icon">
                            🤖
                        </div>

                        <select
                            value={selectedBot?.id || ""}
                            onChange={(e) => {

                                const selected = chatbots.find(
                                    (item) =>
                                        item.id === Number(e.target.value)
                                );

                                if (selected) {
                                    setSelectedBot(selected || bot);
                                    startConversation(selected.id);
                                }

                            }}
                        >

                            <option value="">
                                Select ChatBot
                            </option>

                            {chatbots.map((item) => (

                                <option
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.name}
                                </option>

                            ))}

                        </select>

                    </div>


                    <button
                        className="clear-button"
                        onClick={clearConversation}
                    >
                       Clear Conversation
                    </button>

                </div>


                {/* CHAT WINDOW */}

                <div className="chat-window">

                    {messages.length === 0 && (

                        <div className="welcome-chat">

                            <div className="large-bot-icon">
                                🤖
                            </div>

                            <h3>
                                Hello! 👋
                            </h3>

                            <p>
                                How can I help you today?
                            </p>

                        </div>

                    )}


                    {messages.map((msg, index) => (

                        <div
                            key={index}
                            className={
                                msg.sender === "USER"
                                    ? "chat-message user-message"
                                    : "chat-message bot-message"
                            }
                        >

                            {msg.sender === "BOT" && (

                                <div className="chat-icon bot-icon">
                                    🤖
                                </div>

                            )}


                            <div className="message-content">

                                <div className="message-bubble">
                                    {msg.text}
                                </div>

                                <span className="message-time">
                                    {new Date().toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </span>

                            </div>


                            {msg.sender === "USER" && (

                                <div className="chat-icon user-icon">
                                    👤
                                </div>

                            )}

                        </div>

                    ))}


                    {typing && (

                        <div className="chat-message bot-message">

                            <div className="chat-icon bot-icon">
                                🤖
                            </div>

                            <div className="typing-indicator">

                                <span></span>
                                <span></span>
                                <span></span>

                            </div>

                        </div>

                    )}

                </div>


                {/* INPUT */}

                <form
                    className="message-input-area"
                    onSubmit={handleSend}
                >

                    <span className="attachment-icon">
                        📎
                    </span>

                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) =>
                            setMessage(e.target.value)
                        }
                    />

                    <button type="submit">
                        Send ➤
                    </button>

                </form>

            </main>


            {/* RIGHT SIDEBAR */}

            <aside className="chat-info">

                <div className="assistant-card">

                    <div className="assistant-avatar">
                        🤖
                    </div>

                    <h3>
                        {selectedBot?.name || "AI Assistant"}
                    </h3>

                    <p className="assistant-online">
                        🟢 Online
                    </p>

                    <hr />

                    <h4>
                        About this assistant
                    </h4>

                    <p>
                        {selectedBot?.description ||
                            "Get information, assistance and answers from your AI assistant."}
                    </p>

                </div>


                <div className="session-card">

                    <h3>
                        Current Session
                    </h3>

                    <div className="session-detail">
                        🆔
                        <div>
                            <span>Session ID</span>
                            <strong>
                                {conversationId || "Starting..."}
                            </strong>
                        </div>
                    </div>

                    <div className="session-detail">
                        💬
                        <div>
                            <span>Messages</span>
                            <strong>
                                {messages.length}
                            </strong>
                        </div>
                    </div>

                    <div className="session-detail">
                        🟢
                        <div>
                            <span>Status</span>
                            <strong className="active-session">
                                Active
                            </strong>
                        </div>
                    </div>

                </div>


                {/* RATING */}

                <div className="rating-card">

                    <h3>
                        How was your experience?
                    </h3>

                    <p>
                        Please rate this conversation
                    </p>

                    <div className="stars">

                        {[1, 2, 3, 4, 5].map((star) => (

                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                type="button"
                                className={
                                    star <= rating
                                        ? "star selected-star"
                                        : "star"
                                }
                            >
                                ★
                            </button>

                        ))}

                    </div>

                    <small>
                        Your feedback helps us improve!
                    </small>

                </div>


                <button
                    className="back-button"
                    onClick={onBack}
                >
                    ← Back to ChatBots
                </button>

            </aside>

        </div>
    );
}

export default Chatbot;