import React, { useEffect, useState } from "react";

import {
    getAnalytics,
    getConversations,
    addAnalytics,
    deleteAnalytics
} from "../services/api";

import "../styles/analyticsmanagement.css";

function AnalyticsManagement() {

    const [analytics, setAnalytics] = useState([]);
    const [conversations, setConversations] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [conversationId, setConversationId] = useState("");
    const [metricType, setMetricType] = useState("");
    const [value, setValue] = useState("");
    const [dimensions, setDimensions] = useState("");
    const [period, setPeriod] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const analyticsData = await getAnalytics();
            const conversationData = await getConversations();

            setAnalytics(analyticsData);
            setConversations(conversationData);

        } catch (error) {

            console.error("Error loading analytics:", error);

        }
    };

    const handleAddAnalytics = async (e) => {

        e.preventDefault();

        try {

            const selectedConversation =
                conversations.find(
                    (conversation) =>
                        conversation.id === Number(conversationId)
                );

            if (!selectedConversation) {

                alert("Please select a conversation");
                return;

            }

            const analyticsData = {

                botId: selectedConversation.botId,

                conversationId: Number(conversationId),

                metricType: metricType,

                value: Number(value),

                dimensions: dimensions,

                calculated: false,

                period: period
            };

            const savedAnalytics =
                await addAnalytics(analyticsData);

            setAnalytics([
                ...analytics,
                savedAnalytics
            ]);

            setConversationId("");
            setMetricType("");
            setValue("");
            setDimensions("");
            setPeriod("");

            setShowForm(false);

            alert("Analytics added successfully");

        } catch (error) {

            console.error("Analytics error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to add analytics"
            );
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this analytics record?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteAnalytics(id);

            setAnalytics(
                analytics.filter(
                    (item) => item.id !== id
                )
            );

            alert("Analytics deleted successfully");

        } catch (error) {

            console.error("Delete error:", error);

            alert("Failed to delete analytics");
        }
    };

    return (

        <div className="analytics-page">

            {/* HEADER */}

            <div className="analytics-header">

                <div>

                    <h1>Analytics Management</h1>

                    <p>
                        Monitor chatbot performance and conversation metrics.
                    </p>

                </div>

                <button
                    className="analytics-back-button"
                    onClick={() =>
                        window.location.href = "/admin"
                    }
                >
                    ← Back to Dashboard
                </button>

            </div>


            {/* TOP SUMMARY */}

            <div className="analytics-summary">

                <div className="analytics-summary-card">

                    <span className="summary-icon">
                        📊
                    </span>

                    <div>
                        <p>Total Records</p>
                        <h2>{analytics.length}</h2>
                    </div>

                </div>


                <div className="analytics-summary-card">

                    <span className="summary-icon">
                        💬
                    </span>

                    <div>
                        <p>Conversations</p>
                        <h2>{conversations.length}</h2>
                    </div>

                </div>


                <div className="analytics-summary-card">

                    <span className="summary-icon">
                        📈
                    </span>

                    <div>
                        <p>Metrics</p>
                        <h2>
                            {
                                new Set(
                                    analytics.map(
                                        item => item.metricType
                                    )
                                ).size
                            }
                        </h2>
                    </div>

                </div>

            </div>


            {/* ACTION BAR */}

            <div className="analytics-toolbar">

                <div>

                    <h2>Analytics Records</h2>

                    <p>
                        View and manage chatbot performance data.
                    </p>

                </div>

                <button
                    className="add-analytics-button"
                    onClick={() => setShowForm(true)}
                >
                    + Add Analytics
                </button>

            </div>


            {/* FORM */}

            {showForm && (

                <div className="analytics-form-card">

                    <h2>Add Analytics</h2>

                    <form
                        onSubmit={handleAddAnalytics}
                        className="analytics-form"
                    >

                        <div className="form-group">

                            <label>
                                Conversation
                            </label>

                            <select
                                value={conversationId}
                                onChange={(e) =>
                                    setConversationId(e.target.value)
                                }
                                required
                            >

                                <option value="">
                                    Select Conversation
                                </option>

                                {conversations.map(
                                    (conversation) => (

                                        <option
                                            key={conversation.id}
                                            value={conversation.id}
                                        >

                                            {conversation.id}
                                            {" - "}
                                            {conversation.botName}
                                            {" - "}
                                            {conversation.sessionId}

                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Metric Type
                            </label>

                            <select
                                value={metricType}
                                onChange={(e) =>
                                    setMetricType(e.target.value)
                                }
                                required
                            >

                                <option value="">
                                    Select Metric
                                </option>

                                <option value="Response Time">
                                    Response Time
                                </option>

                                <option value="Satisfaction">
                                    Satisfaction
                                </option>

                                <option value="Messages">
                                    Messages
                                </option>

                                <option value="Resolution Rate">
                                    Resolution Rate
                                </option>

                                <option value="Conversation Count">
                                    Conversation Count
                                </option>

                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Value
                            </label>

                            <input
                                type="number"
                                value={value}
                                onChange={(e) =>
                                    setValue(e.target.value)
                                }
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Dimensions
                            </label>

                            <input
                                type="text"
                                placeholder="Example: channel=WhatsApp"
                                value={dimensions}
                                onChange={(e) =>
                                    setDimensions(e.target.value)
                                }
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Period
                            </label>

                            <select
                                value={period}
                                onChange={(e) =>
                                    setPeriod(e.target.value)
                                }
                                required
                            >

                                <option value="">
                                    Select Period
                                </option>

                                <option value="Daily">
                                    Daily
                                </option>

                                <option value="Weekly">
                                    Weekly
                                </option>

                                <option value="Monthly">
                                    Monthly
                                </option>

                            </select>

                        </div>


                        <div className="analytics-form-buttons">

                            <button
                                type="submit"
                                className="save-analytics-button"
                            >
                                Add Analytics
                            </button>

                            <button
                                type="button"
                                className="cancel-analytics-button"
                                onClick={() =>
                                    setShowForm(false)
                                }
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* TABLE */}

            <div className="analytics-table-card">

                {analytics.length === 0 ? (

                    <div className="empty-analytics">

                        <div>
                            📊
                        </div>

                        <h3>
                            No analytics found
                        </h3>

                        <p>
                            Add your first analytics record to see
                            chatbot performance data.
                        </p>

                    </div>

                ) : (

                    <div className="table-wrapper">

                        <table className="analytics-table">

                            <thead>

                                <tr>

                                    <th>Bot</th>

                                    <th>Conversation</th>

                                    <th>Metric</th>

                                    <th>Value</th>

                                    <th>Dimensions</th>

                                    <th>Period</th>

                                    <th>Action</th>

                                </tr>

                            </thead>


                            <tbody>

                                {analytics.map(
                                    (item) => (

                                        <tr key={item.id}>

                                            <td>
                                                <strong>
                                                    {item.botName || "Unknown"}
                                                </strong>
                                            </td>

                                            <td>
                                                #{item.conversationId}
                                            </td>

                                            <td>

                                                <span className="metric-badge">
                                                    {item.metricType}
                                                </span>

                                            </td>

                                            <td>
                                                <strong>
                                                    {item.value}
                                                </strong>
                                            </td>

                                            <td>
                                                {item.dimensions || "-"}
                                            </td>

                                            <td>
                                                {item.period}
                                            </td>

                                            <td>

                                                <button
                                                    className="delete-analytics-button"
                                                    onClick={() =>
                                                        handleDelete(item.id)
                                                    }
                                                >
                                                    Delete
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

export default AnalyticsManagement;