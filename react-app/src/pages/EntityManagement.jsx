import React, { useEffect, useState } from "react";

import {
    getEntities,
    addEntity,
    updateEntity,
    deleteEntity,
    getChatBots
} from "../services/api";

import "../styles/EntityManagement.css";


function EntityManagement({ onBack }) {

    const [entities, setEntities] = useState([]);
    const [chatbots, setChatbots] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);

    const [botId, setBotId] = useState("");
    const [name, setName] = useState("");
    const [entityType, setEntityType] = useState("");
    const [values, setValues] = useState("");
    const [synonyms, setSynonyms] = useState("");
    const [patterns, setPatterns] = useState("");
    const [contextual, setContextual] = useState(false);


    // ==============================
    // LOAD DATA
    // ==============================

    useEffect(() => {
        loadEntities();
        loadChatBots();
    }, []);


    const loadEntities = async () => {

        try {

            const data = await getEntities();

            setEntities(data);

        } catch (error) {

            console.error(
                "Error loading entities:",
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


    // ==============================
    // CLEAR FORM
    // ==============================

    const clearForm = () => {

        setBotId("");
        setName("");
        setEntityType("");
        setValues("");
        setSynonyms("");
        setPatterns("");
        setContextual(false);

        setEditId(null);
    };


    // ==============================
    // ADD / UPDATE ENTITY
    // ==============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const entityData = {

                botId: Number(botId),

                name: name,

                entityType: entityType,

                values: values,

                synonyms: synonyms,

                patterns: patterns,

                contextual: contextual

            };


            if (editId) {

                const updated =
                    await updateEntity(
                        editId,
                        entityData
                    );


                setEntities(
                    entities.map((entity) =>
                        entity.id === editId
                            ? updated
                            : entity
                    )
                );


                alert(
                    "Entity updated successfully"
                );

            } else {

                const saved =
                    await addEntity(entityData);


                setEntities([
                    ...entities,
                    saved
                ]);


                alert(
                    "Entity added successfully"
                );
            }


            clearForm();

            setShowForm(false);


        } catch (error) {

            console.error(
                "Entity error:",
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
                "Failed to save entity"
            );
        }
    };


    // ==============================
    // EDIT
    // ==============================

    const handleEdit = (entity) => {

        setEditId(entity.id);

        setBotId(entity.botId);

        setName(
            entity.name || ""
        );

        setEntityType(
            entity.entityType || ""
        );

        setValues(
            entity.values || ""
        );

        setSynonyms(
            entity.synonyms || ""
        );

        setPatterns(
            entity.patterns || ""
        );

        setContextual(
            entity.contextual || false
        );

        setShowForm(true);
    };


    // ==============================
    // DELETE
    // ==============================

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this entity?"
            );


        if (!confirmDelete) {
            return;
        }


        try {

            await deleteEntity(id);


            setEntities(
                entities.filter(
                    (entity) =>
                        entity.id !== id
                )
            );


            alert(
                "Entity deleted successfully"
            );


        } catch (error) {

            console.error(
                "Delete error:",
                error
            );

            alert(
                "Failed to delete entity"
            );
        }
    };


    // ==============================
    // UI
    // ==============================

    return (

        <div className="entity-management-page">


            {/* =========================
                BACK BUTTON
            ========================= */}

            <button
                className="entity-back-button"
                onClick={onBack}
            >
                ← Back to Dashboard
            </button>


            {/* =========================
                HEADER
            ========================= */}

            <div className="entity-header">

                <div>

                    <h1>
                        Entity Management
                    </h1>

                    <p>
                        Create and manage chatbot entities
                    </p>

                </div>


                <button
                    className="add-entity-button"
                    onClick={() => {

                        clearForm();

                        setShowForm(true);

                    }}
                >
                    + Add Entity
                </button>

            </div>


            {/* =========================
                ADD / EDIT FORM
            ========================= */}

            {showForm && (

                <div className="entity-form-card">

                    <div className="entity-form-header">

                        <div>

                            <h2>
                                {editId
                                    ? "Edit Entity"
                                    : "Add New Entity"}
                            </h2>

                            <p>
                                Configure entity information for your chatbot
                            </p>

                        </div>

                    </div>


                    <form
                        className="entity-form"
                        onSubmit={handleSubmit}
                    >


                        {/* CHATBOT */}

                        <div className="entity-form-group">

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


                        {/* ENTITY NAME */}

                        <div className="entity-form-group">

                            <label>
                                Entity Name
                            </label>

                            <input
                                type="text"
                                placeholder="Example: Location"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        {/* ENTITY TYPE */}

                        <div className="entity-form-group">

                            <label>
                                Entity Type
                            </label>

                            <input
                                type="text"
                                placeholder="Example: location"
                                value={entityType}
                                onChange={(e) =>
                                    setEntityType(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        {/* VALUES */}

                        <div className="entity-form-group">

                            <label>
                                Values
                            </label>

                            <textarea
                                placeholder="Example: Coimbatore, Chennai, Bangalore"
                                value={values}
                                onChange={(e) =>
                                    setValues(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        {/* SYNONYMS */}

                        <div className="entity-form-group">

                            <label>
                                Synonyms
                            </label>

                            <textarea
                                placeholder="Example: Kovai, Madras, Bengaluru"
                                value={synonyms}
                                onChange={(e) =>
                                    setSynonyms(
                                        e.target.value
                                    )
                                }
                            />

                        </div>


                        {/* PATTERNS */}

                        <div className="entity-form-group">

                            <label>
                                Patterns
                            </label>

                            <textarea
                                placeholder="Example: city, place, location"
                                value={patterns}
                                onChange={(e) =>
                                    setPatterns(
                                        e.target.value
                                    )
                                }
                            />

                        </div>


                        {/* CONTEXTUAL */}

                        <div className="entity-contextual">

                            <label>

                                <input
                                    type="checkbox"
                                    checked={contextual}
                                    onChange={(e) =>
                                        setContextual(
                                            e.target.checked
                                        )
                                    }
                                />

                                <span>
                                    Contextual Entity
                                </span>

                            </label>

                            <small>
                                Enable this entity when its meaning depends on conversation context.
                            </small>

                        </div>


                        {/* FORM BUTTONS */}

                        <div className="entity-form-actions">

                            <button
                                type="submit"
                                className="entity-save-button"
                            >

                                {editId
                                    ? "Update Entity"
                                    : "Add Entity"}

                            </button>


                            <button
                                type="button"
                                className="entity-cancel-button"
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
                ENTITY LIST
            ========================= */}

            <div className="entity-list-card">

                <div className="entity-list-header">

                    <div>

                        <h2>
                            Existing Entities
                        </h2>

                        <p>
                            Manage entities configured for your chatbots
                        </p>

                    </div>


                    <div className="entity-count">

                        {entities.length}{" "}
                        {entities.length === 1
                            ? "Entity"
                            : "Entities"}

                    </div>

                </div>


                {entities.length === 0 ? (

                    <div className="entity-empty">

                        <div className="entity-empty-icon">
                            ◇
                        </div>

                        <h3>
                            No entities found
                        </h3>

                        <p>
                            Create your first entity using the
                            "+ Add Entity" button.
                        </p>

                    </div>

                ) : (

                    <div className="entity-table-wrapper">

                        <table className="entity-table">

                            <thead>

                                <tr>

                                    <th>
                                        ChatBot
                                    </th>

                                    <th>
                                        Entity Name
                                    </th>

                                    <th>
                                        Type
                                    </th>

                                    <th>
                                        Values
                                    </th>

                                    <th>
                                        Contextual
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {entities.map(
                                    (entity) => (

                                        <tr
                                            key={
                                                entity.id
                                            }
                                        >

                                            <td>

                                                <span className="entity-bot-name">

                                                    {entity.botName ||
                                                        chatbots.find(
                                                            (bot) =>
                                                                bot.id ===
                                                                entity.botId
                                                        )?.name ||
                                                        `Bot ${entity.botId}`}

                                                </span>

                                            </td>


                                            <td>

                                                <strong>
                                                    {entity.name}
                                                </strong>

                                            </td>


                                            <td>

                                                <span className="entity-type">

                                                    {entity.entityType}

                                                </span>

                                            </td>


                                            <td>

                                                <div className="entity-values">

                                                    {entity.values || "-"}

                                                </div>

                                            </td>


                                            <td>

                                                {entity.contextual ? (

                                                    <span className="entity-status-yes">
                                                        Yes
                                                    </span>

                                                ) : (

                                                    <span className="entity-status-no">
                                                        No
                                                    </span>

                                                )}

                                            </td>


                                            <td>

                                                <div className="entity-actions">

                                                    <button
                                                        className="entity-edit-button"
                                                        onClick={() =>
                                                            handleEdit(
                                                                entity
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        className="entity-delete-button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                entity.id
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


export default EntityManagement;