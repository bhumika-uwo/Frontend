import axios from 'axios';
import { API } from '../../../types';

// Create axios instance for AIBASE API
const aibaseApi = axios.create({
    baseURL: `${API}/aibase`,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 60000, // 60 second timeout for AI responses
});

// Request interceptor for auth token
aibaseApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
aibaseApi.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('[AIBASE API Error]', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// API Functions
export const aibaseService = {
    // Chat
    async sendMessage(message, conversationId = null) {
        const response = await aibaseApi.post('/chat', { message, conversationId });
        return response.data;
    },

    async getChatHistory() {
        const response = await aibaseApi.get('/chat/history');
        return response.data;
    },

    async getConversation(id) {
        const response = await aibaseApi.get(`/chat/${id}`);
        return response.data;
    },

    async deleteConversation(id) {
        const response = await aibaseApi.delete(`/chat/${id}`);
        return response.data;
    },

    // Knowledge Base
    async uploadDocument(file) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await aibaseApi.post('/knowledge/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            timeout: 120000, // 2 min for large files
        });
        return response.data;
    },

    async getDocuments() {
        const response = await aibaseApi.get('/knowledge/documents');
        return response.data;
    },

    async deleteDocument(id) {
        const response = await aibaseApi.delete(`/knowledge/${id}`);
        return response.data;
    },
};

export default aibaseApi;
