// import React, { useEffect, useState } from "react";

// import {
//     getChatBots,
//     getConversations
// } from "../services/api";

// import ChatBots from "./ChatBots";
// import IntentManagement from "./IntentManagement";
// import EntityManagement from "./EntityManagement";
// import ConversationManagement from "./ConversationManagement";
// import MessageManagement from "./MessageManagement";
// import ChannelManagement from "./ChannelManagement";
// import IntegrationManagement from "./IntegrationManagement";
// import AnalyticsManagement from "./AnalyticsManagement";
// import UserManagement from "./UserManagement";

// import "../styles/AdminDashboard.css";


// function AdminDashboard() {

//     const [chatbots, setChatbots] = useState([]);
//     const [conversations, setConversations] = useState([]);

//     const [currentPage, setCurrentPage] = useState("dashboard");


//     useEffect(() => {
//         loadDashboardData();
//     }, []);


//     const loadDashboardData = async () => {

//         try {

//             const bots = await getChatBots();
//             setChatbots(bots);

//         } catch (error) {

//             console.error(
//                 "Error loading chatbots:",
//                 error
//             );

//         }


//         try {

//             const data = await getConversations();

//             setConversations(data);

//         } catch (error) {

//             console.error(
//                 "Error loading conversations:",
//                 error
//             );

//         }

//     };


//     const handleLogout = () => {

//         localStorage.removeItem("token");
//         localStorage.removeItem("role");

//         window.location.reload();

//     };


//     /*
//     ============================================
//     NAVIGATION
//     ============================================
//     */

//     if (currentPage === "chatbots") {

//         return (
//             <ChatBots
//                 onBack={() =>
//                     setCurrentPage("dashboard")
//                 }
//             />
//         );

//     }


//     if (currentPage === "intents") {

//         return (
//             <IntentManagement
//                 onBack={() =>
//                     setCurrentPage("dashboard")
//                 }
//             />
//         );

//     }


//     if (currentPage === "entities") {

//         return (
//             <EntityManagement
//                 onBack={() =>
//                     setCurrentPage("dashboard")
//                 }
//             />
//         );

//     }


//     if (currentPage === "conversations") {

//         return (
//             <ConversationManagement
//                 onBack={() =>
//                     setCurrentPage("dashboard")
//                 }
//             />
//         );

//     }


//     if (currentPage === "messages") {

//         return (
//             <MessageManagement
//                 onBack={() =>
//                     setCurrentPage("dashboard")
//                 }
//             />
//         );

//     }


//     if (currentPage === "channels") {

//         return (
//             <ChannelManagement
//                 onBack={() =>
//                     setCurrentPage("dashboard")
//                 }
//             />
//         );

//     }


//     if (currentPage === "integrations") {

//         return (
//             <IntegrationManagement
//                 onBack={() =>
//                     setCurrentPage("dashboard")
//                 }
//             />
//         );

//     }


//     if (currentPage === "analytics") {

//         return (
//             <AnalyticsManagement
//                 onBack={() =>
//                     setCurrentPage("dashboard")
//                 }
//             />
//         );

//     }


//     if (currentPage === "users") {

//         return (
//             <UserManagement
//                 onBack={() =>
//                     setCurrentPage("dashboard")
//                 }
//             />
//         );

//     }


//     /*
//     ============================================
//     GRAPH DATA
//     ============================================
//     */

//     const getLastSevenDays = () => {

//         const days = [];

//         for (let i = 6; i >= 0; i--) {

//             const date = new Date();

//             date.setDate(
//                 date.getDate() - i
//             );

//             days.push(date);

//         }

//         return days;

//     };


//     const days = getLastSevenDays();


//     const graphData = days.map((day) => {

//         const dayString =
//             day.toISOString().split("T")[0];


//         const count = conversations.filter(
//             (conversation) => {

//                 if (!conversation.startTime) {
//                     return false;
//                 }

//                 const conversationDate =
//                     new Date(
//                         conversation.startTime
//                     )
//                         .toISOString()
//                         .split("T")[0];

//                 return (
//                     conversationDate ===
//                     dayString
//                 );

//             }
//         ).length;


//         return {
//             label: day.toLocaleDateString(
//                 "en-US",
//                 {
//                     weekday: "short"
//                 }
//             ),
//             value: count
//         };

//     });


//     const maxValue =
//         Math.max(
//             ...graphData.map(
//                 item => item.value
//             ),
//             1
//         );


//     const activeBots =
//         chatbots.filter(
//             bot =>
//                 bot.status === "ACTIVE"
//         ).length;


//     /*
//     ============================================
//     DASHBOARD
//     ============================================
//     */

//     return (

//         <div className="admin-dashboard">


//             {/* ====================================
//                 SIDEBAR
//             ==================================== */}

//             <aside className="admin-sidebar">


//                 {/* BRAND */}

//                 <div className="admin-brand">

//                     <div className="admin-brand-icon">
//                         🤖
//                     </div>

//                     <div>

//                         <h2>
//                             AI ChatBot
//                         </h2>

//                         <p>
//                             Integration Platform
//                         </p>

//                     </div>

//                 </div>


//                 {/* NAVIGATION */}

//                 <nav className="admin-nav">

//                     <div className="admin-nav-title">
//                         MAIN MENU
//                     </div>


//                     <button
//                         className="admin-nav-item active"
//                         onClick={() =>
//                             setCurrentPage(
//                                 "dashboard"
//                             )
//                         }
//                     >
//                         Dashboard
//                     </button>


//                     <button
//                         className="admin-nav-item"
//                         onClick={() =>
//                             setCurrentPage(
//                                 "chatbots"
//                             )
//                         }
//                     >
//                         ChatBots
//                     </button>


//                     <button
//                         className="admin-nav-item"
//                         onClick={() =>
//                             setCurrentPage(
//                                 "intents"
//                             )
//                         }
//                     >
//                         Intents
//                     </button>


//                     <button
//                         className="admin-nav-item"
//                         onClick={() =>
//                             setCurrentPage(
//                                 "entities"
//                             )
//                         }
//                     >
//                         Entities
//                     </button>


//                     <button
//                         className="admin-nav-item"
//                         onClick={() =>
//                             setCurrentPage(
//                                 "conversations"
//                             )
//                         }
//                     >
//                         Conversations
//                     </button>


//                     <button
//                         className="admin-nav-item"
//                         onClick={() =>
//                             setCurrentPage(
//                                 "messages"
//                             )
//                         }
//                     >
//                         Messages
//                     </button>


//                     <button
//                         className="admin-nav-item"
//                         onClick={() =>
//                             setCurrentPage(
//                                 "channels"
//                             )
//                         }
//                     >
//                         Channels
//                     </button>


//                     <button
//                         className="admin-nav-item"
//                         onClick={() =>
//                             setCurrentPage(
//                                 "integrations"
//                             )
//                         }
//                     >
//                         Integrations
//                     </button>


//                     <button
//                         className="admin-nav-item"
//                         onClick={() =>
//                             setCurrentPage(
//                                 "analytics"
//                             )
//                         }
//                     >
//                         Analytics
//                     </button>


//                     <button
//                         className="admin-nav-item"
//                         onClick={() =>
//                             setCurrentPage(
//                                 "users"
//                             )
//                         }
//                     >
//                         Users
//                     </button>

//                 </nav>


//                 {/* SIDEBAR BOTTOM */}

//                 <div className="admin-sidebar-bottom">

//                     <div className="admin-profile">

//                         <div className="admin-profile-icon">
                            
//                         </div>

//                         <div>

//                             <strong>
//                                 Admin User
//                             </strong>

//                             <small>
//                                 admin@example.com
//                             </small>

//                         </div>

//                     </div>


//                     <div className="admin-online">
//                         <span></span>
//                         Online
//                     </div>


//                     <button
//                         className="admin-logout"
//                         onClick={handleLogout}
//                     >
//                          Logout
//                     </button>

//                 </div>

//             </aside>


//             {/* ====================================
//                 MAIN CONTENT
//             ==================================== */}

//             <div className="admin-main">


//                 {/* TOP BAR */}

//                 <header className="admin-topbar">

//                     <div className="admin-menu-icon">
//                         ☰
//                     </div>


//                     <div className="admin-search-wrapper">

//                         <span>
                            
//                         </span>

//                         <input
//                             type="text"
//                             placeholder="Search..."
//                         />

//                     </div>


//                     <div className="admin-top-user">

//                         <span className="notification">
                            
//                         </span>

//                         <div className="admin-top-avatar">
                            
//                         </div>

//                         <span>
//                             Admin ▾
//                         </span>

//                     </div>

//                 </header>


//                 {/* CONTENT */}

//                 <main className="admin-content">


//                     {/* PAGE TITLE */}

//                     <div className="admin-page-title">

//                         <h1>
//                             Admin Dashboard
//                         </h1>

//                         <p>
//                             Home / Dashboard
//                         </p>

//                     </div>


//                     {/* =================================
//                         GRAPH + OVERVIEW
//                     ================================= */}

//                     <div className="dashboard-grid">


//                         {/* GRAPH */}

//                         <section className="dashboard-panel graph-panel">

//                             <div className="panel-header">

//                                 <div>

//                                     <h2>
//                                         Conversation Analytics
//                                     </h2>

//                                     <p>
//                                         Conversations during the last 7 days
//                                     </p>

//                                 </div>


//                                 <div className="graph-summary">

//                                     <strong>
//                                         {conversations.length}
//                                     </strong>

//                                     <span>
//                                         Total Conversations
//                                     </span>

//                                 </div>

//                             </div>


//                             <div className="graph-container">

//                                 <div className="y-axis">

//                                     <span>
//                                         {maxValue}
//                                     </span>

//                                     <span>
//                                         {Math.ceil(
//                                             maxValue / 2
//                                         )}
//                                     </span>

//                                     <span>
//                                         0
//                                     </span>

//                                 </div>


//                                 <div className="chart-area">

//                                     <div className="horizontal-line line-one"></div>

//                                     <div className="horizontal-line line-two"></div>

//                                     <div className="horizontal-line line-three"></div>


//                                     <div className="bar-container">

//                                         {graphData.map(
//                                             (item, index) => {

//                                                 const height =
//                                                     item.value === 0
//                                                         ? 5
//                                                         :
//                                                         (
//                                                             item.value /
//                                                             maxValue
//                                                         ) * 100;

//                                                 return (

//                                                     <div
//                                                         className="chart-column"
//                                                         key={index}
//                                                     >

//                                                         <div
//                                                             className="chart-value"
//                                                         >
//                                                             {item.value}
//                                                         </div>

//                                                         <div
//                                                             className="chart-bar"
//                                                             style={{
//                                                                 height:
//                                                                     `${height}%`
//                                                             }}
//                                                         />

//                                                         <span>
//                                                             {item.label}
//                                                         </span>

//                                                     </div>

//                                                 );

//                                             }
//                                         )}

//                                     </div>

//                                 </div>

//                             </div>

//                         </section>


//                         {/* SYSTEM OVERVIEW */}

//                         <section className="dashboard-panel overview-panel">

//                             <div className="panel-header">

//                                 <div>

//                                     <h2>
//                                         System Overview
//                                     </h2>

//                                     <p>
//                                         Current platform status
//                                     </p>

//                                 </div>

//                             </div>


//                             <div className="overview-item">

//                                 <div className="overview-icon green">
                                    
//                                 </div>

//                                 <div>

//                                     <span>
//                                         ChatBots
//                                     </span>

//                                     <strong>
//                                         {chatbots.length}
//                                     </strong>

//                                 </div>

//                             </div>


//                             <div className="overview-item">

//                                 <div className="overview-icon green">
//                                     ✓
//                                 </div>

//                                 <div>

//                                     <span>
//                                         Active ChatBots
//                                     </span>

//                                     <strong>
//                                         {activeBots}
//                                     </strong>

//                                 </div>

//                             </div>


//                             <div className="overview-item">

//                                 <div className="overview-icon orange">
                                    
//                                 </div>

//                                 <div>

//                                     <span>
//                                         Conversations
//                                     </span>

//                                     <strong>
//                                         {conversations.length}
//                                     </strong>

//                                 </div>

//                             </div>


//                             <div className="overview-status">

//                                 <span></span>

//                                 All systems operational

//                             </div>

//                         </section>

//                     </div>


//                     {/* =================================
//                         RECENT CONVERSATIONS
//                     ================================= */}

//                     <section className="dashboard-panel recent-panel">

//                         <div className="panel-header">

//                             <div>

//                                 <h2>
//                                     Recent Conversations
//                                 </h2>

//                                 <p>
//                                     Latest chatbot activity
//                                 </p>

//                             </div>


//                             <button
//                                 className="view-all-button"
//                                 onClick={() =>
//                                     setCurrentPage(
//                                         "conversations"
//                                     )
//                                 }
//                             >
//                                 View All →
//                             </button>

//                         </div>


//                         {conversations.length === 0 ? (

//                             <div className="empty-dashboard">
//                                 No conversations available yet.
//                             </div>

//                         ) : (

//                             <div className="recent-list">

//                                 {conversations
//                                     .slice(-5)
//                                     .reverse()
//                                     .map(
//                                         (conversation) => (

//                                             <div
//                                                 className="recent-item"
//                                                 key={
//                                                     conversation.id
//                                                 }
//                                             >

//                                                 <div className="recent-avatar">
                                                    
//                                                 </div>


//                                                 <div className="recent-info">

//                                                     <strong>
//                                                         {conversation.username ||
//                                                             "User"}
//                                                     </strong>

//                                                     <span>

//                                                         {conversation.botName ||
//                                                             "ChatBot"}

//                                                         {" • "}

//                                                         {conversation.channelId ||
//                                                             "WEB"}

//                                                     </span>

//                                                 </div>


//                                                 <div
//                                                     className={
//                                                         conversation.status ===
//                                                         "ACTIVE"
//                                                             ?
//                                                             "status active"
//                                                             :
//                                                             "status completed"
//                                                     }
//                                                 >
//                                                     {conversation.status ||
//                                                         "ACTIVE"}
//                                                 </div>

//                                             </div>

//                                         )
//                                     )}

//                             </div>

//                         )}

//                     </section>


//                     {/* =================================
//                         QUICK MANAGEMENT
//                     ================================= */}

//                     <section className="quick-management">

//                         <h2>
//                             Quick Management
//                         </h2>


//                         <div className="quick-grid">


//                             <button
//                                 onClick={() =>
//                                     setCurrentPage(
//                                         "chatbots"
//                                     )
//                                 }
//                             >                                <div>
//                                     <strong>
//                                         ChatBot Management
//                                     </strong>
//                                     <small>
//                                         Create and manage chatbots
//                                     </small>
//                                 </div>
//                             </button>


//                             <button
//                                 onClick={() =>
//                                     setCurrentPage(
//                                         "conversations"
//                                     )
//                                 }
//                             >
//                                 <div>
//                                     <strong>
//                                         Conversation Management
//                                     </strong>
//                                     <small>
//                                         Monitor chatbot conversations
//                                     </small>
//                                 </div>
//                             </button>


//                             <button
//                                 onClick={() =>
//                                     setCurrentPage(
//                                         "analytics"
//                                     )
//                                 }
//                             >
//                                 <div>
//                                     <strong>
//                                         Analytics
//                                     </strong>
//                                     <small>
//                                         View platform performance
//                                     </small>
//                                 </div>
//                             </button>


//                             <button
//                                 onClick={() =>
//                                     setCurrentPage(
//                                         "users"
//                                     )
//                                 }
//                             >
//                                 <div>
//                                     <strong>
//                                         User Management
//                                     </strong>
//                                     <small>
//                                         Manage platform users
//                                     </small>
//                                 </div>
//                             </button>

//                         </div>

//                     </section>


//                 </main>

//             </div>

//         </div>

//     );

// }


// export default AdminDashboard;
import React, { useEffect, useState } from "react";

import {
    getChatBots,
    getConversations
} from "../services/api";

import ChatBots from "./ChatBots";
import IntentManagement from "./IntentManagement";
import EntityManagement from "./EntityManagement";
import ConversationManagement from "./ConversationManagement";
import MessageManagement from "./MessageManagement";
import ChannelManagement from "./ChannelManagement";
import IntegrationManagement from "./IntegrationManagement";
import AnalyticsManagement from "./AnalyticsManagement";
import UserManagement from "./UserManagement";

import "../styles/AdminDashboard.css";


function AdminDashboard() {

    const [chatbots, setChatbots] = useState([]);
    const [conversations, setConversations] = useState([]);

    const [currentPage, setCurrentPage] = useState("dashboard");


    useEffect(() => {
        loadDashboardData();
    }, []);


    const loadDashboardData = async () => {

        try {

            const bots = await getChatBots();
            setChatbots(bots);

        } catch (error) {

            console.error(
                "Error loading chatbots:",
                error
            );

        }


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


    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        window.location.reload();

    };


    /*
    ============================================
    NAVIGATION
    ============================================
    */

    if (currentPage === "chatbots") {

        return (
            <ChatBots
                onBack={() =>
                    setCurrentPage("dashboard")
                }
            />
        );

    }


    if (currentPage === "intents") {

        return (
            <IntentManagement
                onBack={() =>
                    setCurrentPage("dashboard")
                }
            />
        );

    }


    if (currentPage === "entities") {

        return (
            <EntityManagement
                onBack={() =>
                    setCurrentPage("dashboard")
                }
            />
        );

    }


    if (currentPage === "conversations") {

        return (
            <ConversationManagement
                onBack={() =>
                    setCurrentPage("dashboard")
                }
            />
        );

    }


    if (currentPage === "messages") {

        return (
            <MessageManagement
                onBack={() =>
                    setCurrentPage("dashboard")
                }
            />
        );

    }


    if (currentPage === "channels") {

        return (
            <ChannelManagement
                onBack={() =>
                    setCurrentPage("dashboard")
                }
            />
        );

    }


    if (currentPage === "integrations") {

        return (
            <IntegrationManagement
                onBack={() =>
                    setCurrentPage("dashboard")
                }
            />
        );

    }


    if (currentPage === "analytics") {

        return (
            <AnalyticsManagement
                onBack={() =>
                    setCurrentPage("dashboard")
                }
            />
        );

    }


    if (currentPage === "users") {

        return (
            <UserManagement
                onBack={() =>
                    setCurrentPage("dashboard")
                }
            />
        );

    }


    /*
    ============================================
    GRAPH DATA
    ============================================
    */

    const getLastSevenDays = () => {

        const days = [];

        for (let i = 6; i >= 0; i--) {

            const date = new Date();

            date.setDate(
                date.getDate() - i
            );

            days.push(date);

        }

        return days;

    };


    const days = getLastSevenDays();


    const graphData = days.map((day) => {

        const dayString =
            day.toISOString().split("T")[0];


        const count = conversations.filter(
            (conversation) => {

                if (!conversation.startTime) {
                    return false;
                }

                const conversationDate =
                    new Date(
                        conversation.startTime
                    )
                        .toISOString()
                        .split("T")[0];

                return (
                    conversationDate ===
                    dayString
                );

            }
        ).length;


        return {
            label: day.toLocaleDateString(
                "en-US",
                {
                    weekday: "short"
                }
            ),
            value: count
        };

    });


    const maxValue =
        Math.max(
            ...graphData.map(
                item => item.value
            ),
            1
        );


    const activeBots =
        chatbots.filter(
            bot =>
                bot.status === "ACTIVE"
        ).length;


    /*
    ============================================
    DASHBOARD
    ============================================
    */

    return (

        <div className="admin-dashboard">


            {/* ====================================
                SIDEBAR
            ==================================== */}

            <aside className="admin-sidebar">


                {/* BRAND */}

                <div className="admin-brand">

                    <div className="admin-brand-icon">
                        🤖
                    </div>

                    <div>

                        <h2>
                            AI ChatBot
                        </h2>

                        <p>
                            Integration Platform
                        </p>

                    </div>

                </div>


                {/* NAVIGATION */}

                <nav className="admin-nav">

                    <div className="admin-nav-title">
                        MAIN MENU
                    </div>


                    <button
                        className="admin-nav-item active"
                        onClick={() =>
                            setCurrentPage(
                                "dashboard"
                            )
                        }
                    >
                        <span>🏠</span>
                        Dashboard
                    </button>


                    <button
                        className="admin-nav-item"
                        onClick={() =>
                            setCurrentPage(
                                "chatbots"
                            )
                        }
                    >
                        <span>🤖</span>
                        ChatBots
                    </button>


                    <button
                        className="admin-nav-item"
                        onClick={() =>
                            setCurrentPage(
                                "intents"
                            )
                        }
                    >
                        <span>🎯</span>
                        Intents
                    </button>


                    <button
                        className="admin-nav-item"
                        onClick={() =>
                            setCurrentPage(
                                "entities"
                            )
                        }
                    >
                        <span>◈</span>
                        Entities
                    </button>


                    <button
                        className="admin-nav-item"
                        onClick={() =>
                            setCurrentPage(
                                "conversations"
                            )
                        }
                    >
                        <span>💬</span>
                        Conversations
                    </button>


                    <button
                        className="admin-nav-item"
                        onClick={() =>
                            setCurrentPage(
                                "messages"
                            )
                        }
                    >
                        <span>✉️</span>
                        Messages
                    </button>


                    <button
                        className="admin-nav-item"
                        onClick={() =>
                            setCurrentPage(
                                "channels"
                            )
                        }
                    >
                        <span>📡</span>
                        Channels
                    </button>


                    <button
                        className="admin-nav-item"
                        onClick={() =>
                            setCurrentPage(
                                "integrations"
                            )
                        }
                    >
                        <span>🔌</span>
                        Integrations
                    </button>


                    <button
                        className="admin-nav-item"
                        onClick={() =>
                            setCurrentPage(
                                "analytics"
                            )
                        }
                    >
                        <span>📊</span>
                        Analytics
                    </button>


                    <button
                        className="admin-nav-item"
                        onClick={() =>
                            setCurrentPage(
                                "users"
                            )
                        }
                    >
                        <span>👥</span>
                        Users
                    </button>

                </nav>


                {/* SIDEBAR BOTTOM */}

                <div className="admin-sidebar-bottom">

                    <div className="admin-profile">

                        <div className="admin-profile-icon">
                            👤
                        </div>

                        <div>

                            <strong>
                                Admin User
                            </strong>

                            <small>
                                admin@example.com
                            </small>

                        </div>

                    </div>


                    <div className="admin-online">
                        <span></span>
                        Online
                    </div>


                    <button
                        className="admin-logout"
                        onClick={handleLogout}
                    >
                        🚪 Logout
                    </button>

                </div>

            </aside>


            {/* ====================================
                MAIN CONTENT
            ==================================== */}

            <div className="admin-main">


                {/* TOP BAR */}

                <header className="admin-topbar">

                    <div className="admin-menu-icon">
                        ☰
                    </div>


                    <div className="admin-search-wrapper">

                        <span>
                            🔍
                        </span>

                        <input
                            type="text"
                            placeholder="Search..."
                        />

                    </div>


                    <div className="admin-top-user">

                        <span className="notification">
                            🔔
                        </span>

                        <div className="admin-top-avatar">
                            👤
                        </div>

                        <span>
                            Admin ▾
                        </span>

                    </div>

                </header>


                {/* CONTENT */}

                <main className="admin-content">


                    {/* PAGE TITLE */}

                    <div className="admin-page-title">

                        <h1>
                            Admin Dashboard
                        </h1>

                        <p>
                            Home / Dashboard
                        </p>

                    </div>


                    {/* =================================
                        GRAPH + OVERVIEW
                    ================================= */}

                    <div className="dashboard-grid">


                        {/* GRAPH */}

                        <section className="dashboard-panel graph-panel">

                            <div className="panel-header">

                                <div>

                                    <h2>
                                        Conversation Analytics
                                    </h2>

                                    <p>
                                        Conversations during the last 7 days
                                    </p>

                                </div>


                                <div className="graph-summary">

                                    <strong>
                                        {conversations.length}
                                    </strong>

                                    <span>
                                        Total Conversations
                                    </span>

                                </div>

                            </div>


                            <div className="graph-container">

                                <div className="y-axis">

                                    <span>
                                        {maxValue}
                                    </span>

                                    <span>
                                        {Math.ceil(
                                            maxValue / 2
                                        )}
                                    </span>

                                    <span>
                                        0
                                    </span>

                                </div>


                                <div className="chart-area">

                                    <div className="horizontal-line line-one"></div>

                                    <div className="horizontal-line line-two"></div>

                                    <div className="horizontal-line line-three"></div>


                                    <div className="bar-container">

                                        {graphData.map(
                                            (item, index) => {

                                                const height =
                                                    item.value === 0
                                                        ? 5
                                                        :
                                                        (
                                                            item.value /
                                                            maxValue
                                                        ) * 100;

                                                return (

                                                    <div
                                                        className="chart-column"
                                                        key={index}
                                                    >

                                                        <div
                                                            className="chart-value"
                                                        >
                                                            {item.value}
                                                        </div>

                                                        <div
                                                            className="chart-bar"
                                                            style={{
                                                                height:
                                                                    `${height}%`
                                                            }}
                                                        />

                                                        <span>
                                                            {item.label}
                                                        </span>

                                                    </div>

                                                );

                                            }
                                        )}

                                    </div>

                                </div>

                            </div>

                        </section>


                        {/* SYSTEM OVERVIEW */}

                        <section className="dashboard-panel overview-panel">

                            <div className="panel-header">

                                <div>

                                    <h2>
                                        System Overview
                                    </h2>

                                    <p>
                                        Current platform status
                                    </p>

                                </div>

                            </div>


                            <div className="overview-item">

                                <div className="overview-icon green">
                                    🤖
                                </div>

                                <div>

                                    <span>
                                        ChatBots
                                    </span>

                                    <strong>
                                        {chatbots.length}
                                    </strong>

                                </div>

                            </div>


                            <div className="overview-item">

                                <div className="overview-icon green">
                                    ✓
                                </div>

                                <div>

                                    <span>
                                        Active ChatBots
                                    </span>

                                    <strong>
                                        {activeBots}
                                    </strong>

                                </div>

                            </div>


                            <div className="overview-item">

                                <div className="overview-icon orange">
                                    💬
                                </div>

                                <div>

                                    <span>
                                        Conversations
                                    </span>

                                    <strong>
                                        {conversations.length}
                                    </strong>

                                </div>

                            </div>


                            <div className="overview-status">

                                <span></span>

                                All systems operational

                            </div>

                        </section>

                    </div>


                    {/* =================================
                        RECENT CONVERSATIONS
                    ================================= */}

                    <section className="dashboard-panel recent-panel">

                        <div className="panel-header">

                            <div>

                                <h2>
                                    Recent Conversations
                                </h2>

                                <p>
                                    Latest chatbot activity
                                </p>

                            </div>


                            <button
                                className="view-all-button"
                                onClick={() =>
                                    setCurrentPage(
                                        "conversations"
                                    )
                                }
                            >
                                View All →
                            </button>

                        </div>


                        {conversations.length === 0 ? (

                            <div className="empty-dashboard">
                                No conversations available yet.
                            </div>

                        ) : (

                            <div className="recent-list">

                                {conversations
                                    .slice(-5)
                                    .reverse()
                                    .map(
                                        (conversation) => (

                                            <div
                                                className="recent-item"
                                                key={
                                                    conversation.id
                                                }
                                            >

                                                <div className="recent-avatar">
                                                    👤
                                                </div>


                                                <div className="recent-info">

                                                    <strong>
                                                        {conversation.username ||
                                                            "User"}
                                                    </strong>

                                                    <span>

                                                        {conversation.botName ||
                                                            "ChatBot"}

                                                        {" • "}

                                                        {conversation.channelId ||
                                                            "WEB"}

                                                    </span>

                                                </div>


                                                <div
                                                    className={
                                                        conversation.status ===
                                                        "ACTIVE"
                                                            ?
                                                            "status active"
                                                            :
                                                            "status completed"
                                                    }
                                                >
                                                    {conversation.status ||
                                                        "ACTIVE"}
                                                </div>

                                            </div>

                                        )
                                    )}

                            </div>

                        )}

                    </section>


                    {/* =================================
                        QUICK MANAGEMENT
                    ================================= */}

                    <section className="quick-management">

                        <h2>
                            Quick Management
                        </h2>


                        <div className="quick-grid">


                            <button
                                onClick={() =>
                                    setCurrentPage(
                                        "chatbots"
                                    )
                                }
                            >
                                <span>🤖</span>
                                <div>
                                    <strong>
                                        ChatBot Management
                                    </strong>
                                    <small>
                                        Create and manage chatbots
                                    </small>
                                </div>
                            </button>


                            <button
                                onClick={() =>
                                    setCurrentPage(
                                        "conversations"
                                    )
                                }
                            >
                                <span>💬</span>
                                <div>
                                    <strong>
                                        Conversation Management
                                    </strong>
                                    <small>
                                        Monitor chatbot conversations
                                    </small>
                                </div>
                            </button>


                            <button
                                onClick={() =>
                                    setCurrentPage(
                                        "analytics"
                                    )
                                }
                            >
                                <span>📊</span>
                                <div>
                                    <strong>
                                        Analytics
                                    </strong>
                                    <small>
                                        View platform performance
                                    </small>
                                </div>
                            </button>


                            <button
                                onClick={() =>
                                    setCurrentPage(
                                        "users"
                                    )
                                }
                            >
                                <span>👥</span>
                                <div>
                                    <strong>
                                        User Management
                                    </strong>
                                    <small>
                                        Manage platform users
                                    </small>
                                </div>
                            </button>

                        </div>

                    </section>


                </main>

            </div>

        </div>

    );

}


export default AdminDashboard;