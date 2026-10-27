import React, { useEffect, useState } from "react";

import {
    getIntents,
    addIntent,
    updateIntent,
    deleteIntent,
    getChatBots
} from "../services/api";

import "../styles/IntentManagement.css";

function IntentManagement({ onBack }) {

    const [intents, setIntents] = useState([]);
    const [chatbots, setChatbots] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);

    const [botId, setBotId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [trainingPhrases, setTrainingPhrases] = useState("");
    const [responses, setResponses] = useState("");
    const [entities, setEntities] = useState("");
    const [confidence, setConfidence] = useState("");
    const [isActive, setIsActive] = useState(true);


    useEffect(() => {
        loadIntents();
        loadChatBots();
    }, []);


    // =========================
    // LOAD INTENTS
    // =========================

    const loadIntents = async () => {

        try {

            const data = await getIntents();

            setIntents(data);

        } catch (error) {

            console.error("Error loading intents:", error);

        }
    };


    // =========================
    // LOAD CHATBOTS
    // =========================

    const loadChatBots = async () => {

        try {

            const data = await getChatBots();

            setChatbots(data);

        } catch (error) {

            console.error("Error loading chatbots:", error);

        }
    };


    // =========================
    // CLEAR FORM
    // =========================

    const clearForm = () => {

        setBotId("");
        setName("");
        setDescription("");
        setTrainingPhrases("");
        setResponses("");
        setEntities("");
        setConfidence("");
        setIsActive(true);

        setEditId(null);
    };


    // =========================
    // ADD / UPDATE
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const intentData = {

                botId: Number(botId),

                name: name,

                description: description,

                trainingPhrases: trainingPhrases,

                responses: responses,

                entities: entities,

                confidence: Number(confidence),

                isActive: isActive
            };


            if (editId) {

                const updated = await updateIntent(
                    editId,
                    intentData
                );

                setIntents(
                    intents.map((intent) =>
                        intent.id === editId
                            ? updated
                            : intent
                    )
                );

                alert("Intent updated successfully");

            } else {

                const saved = await addIntent(intentData);

                setIntents([
                    ...intents,
                    saved
                ]);

                alert("Intent added successfully");
            }


            clearForm();

            setShowForm(false);


        } catch (error) {

            console.error("Intent error:", error);

            console.error(
                "STATUS:",
                error.response?.status
            );

            console.error(
                "DATA:",
                error.response?.data
            );

            alert("Failed to save intent");
        }
    };


    // =========================
    // EDIT
    // =========================

    const handleEdit = (intent) => {

        setEditId(intent.id);

        setBotId(intent.botId);

        setName(intent.name || "");

        setDescription(
            intent.description || ""
        );

        setTrainingPhrases(
            intent.trainingPhrases || ""
        );

        setResponses(
            intent.responses || ""
        );

        setEntities(
            intent.entities || ""
        );

        setConfidence(
            intent.confidence || ""
        );

        setIsActive(
            intent.isActive
        );

        setShowForm(true);
    };


    // =========================
    // DELETE
    // =========================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this intent?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteIntent(id);

            setIntents(
                intents.filter(
                    (intent) =>
                        intent.id !== id
                )
            );

            alert("Intent deleted successfully");

        } catch (error) {

            console.error(
                "Delete error:",
                error
            );

            alert("Failed to delete intent");
        }
    };


    return (

        <div className="intent-management-page">


            {/* =========================
                BACK BUTTON
            ========================= */}

            <button
                className="intent-back-button"
                onClick={onBack}
            >
                ← Back to Dashboard
            </button>


            {/* =========================
                HEADER
            ========================= */}

            <div className="intent-header">

                <div className="intent-header-left">

                    <h1>
                        Intent Management
                    </h1>

                    <p>
                        Create and manage chatbot intents
                    </p>

                </div>


                <button
                    className="add-intent-button"
                    onClick={() => {

                        clearForm();

                        setShowForm(true);

                    }}
                >
                    + Add Intent
                </button>

            </div>


            {/* =========================
                FORM
            ========================= */}

            {showForm && (

                <div className="intent-form-card">

                    <h2>

                        {editId
                            ? "Edit Intent"
                            : "Add New Intent"}

                    </h2>


                    <form
                        className="intent-form"
                        onSubmit={handleSubmit}
                    >


                        {/* CHATBOT */}

                        <div className="intent-form-group">

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


                        {/* NAME */}

                        <div className="intent-form-group">

                            <label>
                                Intent Name
                            </label>

                            <input
                                type="text"
                                placeholder="Example: Greeting"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div className="intent-form-group full-width">

                            <label>
                                Description
                            </label>

                            <input
                                type="text"
                                placeholder="Example: Greeting intent"
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        {/* TRAINING PHRASES */}

                        <div className="intent-form-group">

                            <label>
                                Training Phrases
                            </label>

                            <textarea
                                placeholder="hello, hi, hey"
                                value={trainingPhrases}
                                onChange={(e) =>
                                    setTrainingPhrases(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        {/* RESPONSES */}

                        <div className="intent-form-group">

                            <label>
                                Responses
                            </label>

                            <textarea
                                placeholder="Hello! How can I help you?"
                                value={responses}
                                onChange={(e) =>
                                    setResponses(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        {/* ENTITIES */}

                        <div className="intent-form-group">

                            <label>
                                Entities
                            </label>

                            <textarea
                                placeholder="Optional entities"
                                value={entities}
                                onChange={(e) =>
                                    setEntities(
                                        e.target.value
                                    )
                                }
                            />

                        </div>


                        {/* CONFIDENCE */}

                        <div className="intent-form-group">

                            <label>
                                Confidence
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                max="1"
                                placeholder="0.90"
                                value={confidence}
                                onChange={(e) =>
                                    setConfidence(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        {/* ACTIVE */}

                        <div className="intent-form-group full-width">

                            <label className="intent-active">

                                <input
                                    type="checkbox"
                                    checked={isActive}
                                    onChange={(e) =>
                                        setIsActive(
                                            e.target.checked
                                        )
                                    }
                                />

                                Active Intent

                            </label>

                        </div>


                        {/* BUTTONS */}

                        <div className="intent-form-actions">

                            <button
                                type="submit"
                                className="intent-save-button"
                            >

                                {editId
                                    ? "Update Intent"
                                    : "Save Intent"}

                            </button>


                            <button
                                type="button"
                                className="intent-cancel-button"
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


            {/* =========================
                INTENT TABLE
            ========================= */}

            <div className="intent-table-card">

                <h2>
                    Existing Intents
                </h2>


                {intents.length === 0 ? (

                    <div className="intent-empty">

                        <p>
                            No intents found.
                        </p>

                        <p>
                            Click "+ Add Intent" to create one.
                        </p>

                    </div>

                ) : (

                    <div className="intent-table-wrapper">

                        <table className="intent-table">

                            <thead>

                                <tr>

                                    <th>
                                        ChatBot
                                    </th>

                                    <th>
                                        Intent Name
                                    </th>

                                    <th>
                                        Description
                                    </th>

                                    <th>
                                        Confidence
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

                                {intents.map(
                                    (intent) => (

                                        <tr
                                            key={
                                                intent.id
                                            }
                                        >

                                            <td>

                                                {intent.botName ||
                                                    chatbots.find(
                                                        (bot) =>
                                                            bot.id ===
                                                            intent.botId
                                                    )?.name ||
                                                    `Bot ${intent.botId}`}

                                            </td>


                                            <td>

                                                <strong>
                                                    {intent.name}
                                                </strong>

                                            </td>


                                            <td>

                                                {intent.description ||
                                                    "-"}

                                            </td>


                                            <td>

                                                {intent.confidence !==
                                                undefined
                                                    ? Number(
                                                        intent.confidence
                                                    ).toFixed(2)
                                                    : "-"}

                                            </td>


                                            <td>

                                                {intent.isActive ? (

                                                    <span className="intent-status-active">
                                                        Active
                                                    </span>

                                                ) : (

                                                    <span className="intent-status-inactive">
                                                        Inactive
                                                    </span>

                                                )}

                                            </td>


                                            <td>

                                                <button
                                                    className="intent-edit-button"
                                                    onClick={() =>
                                                        handleEdit(
                                                            intent
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>


                                                <button
                                                    className="intent-delete-button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            intent.id
                                                        )
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

export default IntentManagement;