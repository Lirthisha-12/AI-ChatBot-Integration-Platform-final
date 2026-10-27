import React, { useEffect, useState } from "react";
import { getChatBots } from "../services/api";
import Chatbot from "./Chatbot";
import "../styles/UserDashboard.css";
function UserDashboard() {

    const [chatbots, setChatbots] = useState([]);
    const [selectedBot, setSelectedBot] = useState(null);

    useEffect(() => {
        loadChatBots();
    }, []);

    const loadChatBots = async () => {
        try {
            const data = await getChatBots();
            setChatbots(data);
        } catch (error) {
            console.error("Error loading chatbots:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.reload();
    };

    // Open chatbot screen
    if (selectedBot) {
        return (
            <Chatbot
                bot={selectedBot}
                onBack={() => setSelectedBot(null)}
            />
        );
    }

    return (
        <div className="user-dashboard">

            {/* HEADER */}
            <header className="user-header">

                <div className="brand-section">
                    <div className="brand-icon">
                        🤖
                    </div>

                    <div>
                        <h1>AI ChatBot</h1>
                        <p>Integration Platform</p>
                    </div>
                </div>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    🚪 Logout
                </button>

            </header>


            {/* MAIN */}
            <main className="user-main">

                <div className="welcome-section">

                    <h2>Welcome back! 👋</h2>

                    <p>
                        Choose an AI assistant to start a conversation.
                    </p>

                </div>


                <h2 className="available-title">
                    Available ChatBots
                </h2>


                {chatbots.length === 0 ? (

                    <div className="empty-bots">
                        <div className="empty-icon">
                            🤖
                        </div>

                        <h3>No ChatBots available</h3>

                        <p>
                            There are currently no active chatbots.
                        </p>
                    </div>

                ) : (

                    <div className="chatbot-grid">

                        {chatbots.map((bot) => (

                            <div
                                key={bot.id}
                                className="chatbot-card"
                            >

                                <div className="bot-card-header">

                                    <div className="bot-avatar">
                                        🤖
                                    </div>

                                    <div>
                                        <h3>{bot.name}</h3>

                                        <span className="online-status">
                                            <span className="status-dot"></span>
                                            {bot.status || "ACTIVE"}
                                        </span>
                                    </div>

                                </div>


                                <p className="bot-description">
                                    {bot.description ||
                                        "Your AI assistant is ready to help you."}
                                </p>


                                <div className="bot-details">

                                    <div>
                                        <span>Platform</span>
                                        <strong>
                                            {bot.deploymentChannels || "Web"}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Status</span>
                                        <strong className="active-text">
                                            {bot.status || "ACTIVE"}
                                        </strong>
                                    </div>

                                </div>


                                <button
                                    className="start-chat-button"
                                    onClick={() => setSelectedBot(bot)}
                                >
                                    💬 Start Chat
                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </div>
    );
}

export default UserDashboard;