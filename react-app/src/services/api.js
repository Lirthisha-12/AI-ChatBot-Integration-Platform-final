import axios from "axios";

const API_URL = "http://localhost:8080/api/bots";


const api = axios.create({
    baseURL: "http://localhost:8080/api"
});

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
export const loginUser = async (email, password) => {
    const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
            email,
            password
        }
    );

    return response.data;
};
export const registerUser = async (data) => {
    const response = await api.post("/auth/register", data);
    return response.data;
};
export const getChatBots = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        "http://localhost:8080/api/bots",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const addChatBot = async (chatbot) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        "http://localhost:8080/api/bots",
        chatbot,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const deleteChatBot = async (id) => {

    const token = localStorage.getItem("token");

    const response = await axios.delete(
        `http://localhost:8080/api/bots/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};
export const updateChatBot = async (id, chatbot) => {
    const response = await axios.put(`${API_URL}/${id}`, chatbot);
    return response.data;
};
export const updateBot = async (id, bot) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `http://localhost:8080/api/bots/${id}`,
        bot,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};
export const getBotById = async (id) => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        `http://localhost:8080/api/bots/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};
export const getChannels = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        "http://localhost:8080/api/channels",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const addChannel = async (channelData) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        "http://localhost:8080/api/channels",
        channelData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const updateChannel = async (id, channelData) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `http://localhost:8080/api/channels/${id}`,
        channelData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const deleteChannel = async (id) => {

    const token = localStorage.getItem("token");

    const response = await axios.delete(
        `http://localhost:8080/api/channels/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};
export const getUsers = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        "http://localhost:8080/api/users",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const addUser = async (userData) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        "http://localhost:8080/api/users",
        userData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const updateUser = async (id, userData) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `http://localhost:8080/api/users/${id}`,
        userData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const deleteUser = async (id) => {

    const token = localStorage.getItem("token");

    const response = await axios.delete(
        `http://localhost:8080/api/users/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};
export const getIntegrations = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        "http://localhost:8080/api/integrations",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const addIntegration = async (integrationData) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        "http://localhost:8080/api/integrations",
        integrationData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const updateIntegration = async (id, integrationData) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `http://localhost:8080/api/integrations/${id}`,
        integrationData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const deleteIntegration = async (id) => {

    const token = localStorage.getItem("token");

    const response = await axios.delete(
        `http://localhost:8080/api/integrations/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const getAnalytics = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        "http://localhost:8080/api/analytics",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const addAnalytics = async (analyticsData) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        "http://localhost:8080/api/analytics",
        analyticsData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const updateAnalytics = async (id, analyticsData) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `http://localhost:8080/api/analytics/${id}`,
        analyticsData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const deleteAnalytics = async (id) => {

    const token = localStorage.getItem("token");

    const response = await axios.delete(
        `http://localhost:8080/api/analytics/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const getConversations = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        "http://localhost:8080/api/conversations",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const addConversation = async (conversationData) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        "http://localhost:8080/api/conversations",
        conversationData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const updateConversation = async (id, data) => {
    const response = await api.put(
        `/conversations/${id}`,
        data
    );

    return response.data;
};

export const deleteConversation = async (id) => {

    const token = localStorage.getItem("token");

    const response = await axios.delete(
        `http://localhost:8080/api/conversations/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const getIntents = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        "http://localhost:8080/api/intents",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const addIntent = async (intentData) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        "http://localhost:8080/api/intents",
        intentData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const updateIntent = async (id, intentData) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `http://localhost:8080/api/intents/${id}`,
        intentData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const deleteIntent = async (id) => {

    const token = localStorage.getItem("token");

    const response = await axios.delete(
        `http://localhost:8080/api/intents/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};
export const getEntities = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        "http://localhost:8080/api/entities",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const addEntity = async (entityData) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        "http://localhost:8080/api/entities",
        entityData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const updateEntity = async (id, entityData) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `http://localhost:8080/api/entities/${id}`,
        entityData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const deleteEntity = async (id) => {

    const token = localStorage.getItem("token");

    const response = await axios.delete(
        `http://localhost:8080/api/entities/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

// ================= MESSAGE MANAGEMENT =================

export const getMessages = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        "http://localhost:8080/api/messages",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const addMessage = async (data) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        "http://localhost:8080/api/messages",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const deleteMessage = async (id) => {

    const token = localStorage.getItem("token");

    const response = await axios.delete(
        `http://localhost:8080/api/messages/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const sendMessage = async (data) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        "http://localhost:8080/api/messages",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const createConversation = async (data) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        "http://localhost:8080/api/conversations",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};