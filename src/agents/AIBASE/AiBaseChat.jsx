import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, MessageSquare, Plus, Trash2, Paperclip, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import Button from './components/Button';
import { aibaseService } from './services/aibaseApi';

const AiBaseChat = () => {
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);

    const [messages, setMessages] = useState([
        { id: 1, role: 'assistant', text: 'Hello! I am the AI-Base Knowledge Assistant. I can answer questions from your uploaded documents or help with general queries.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState(null);
    const [history, setHistory] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Auto scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Load conversation history
    const loadHistory = async () => {
        try {
            const response = await aibaseService.getChatHistory();
            if (response.success) {
                setHistory(response.data || []);
            }
        } catch (error) {
            console.error("Failed to load history", error);
        }
    };

    // Load a specific conversation
    const loadConversation = async (id) => {
        try {
            const response = await aibaseService.getConversation(id);
            if (response.success) {
                const conv = response.data;
                setConversationId(conv._id);
                setMessages(conv.messages.map((m, i) => ({
                    id: i,
                    role: m.role,
                    text: m.text
                })));
            }
        } catch (error) {
            console.error("Failed to load conversation", error);
        }
    };

    // Start new chat
    const startNewChat = () => {
        setConversationId(null);
        setMessages([{
            id: Date.now(),
            role: 'assistant',
            text: 'Hello! I am the AI-Base Knowledge Assistant. I can answer questions from your uploaded documents or help with general queries.'
        }]);
    };

    // Delete conversation
    const handleDeleteChat = async (id, e) => {
        e.stopPropagation();
        if (!window.confirm('Delete this conversation?')) return;

        try {
            await aibaseService.deleteConversation(id);
            if (conversationId === id) {
                startNewChat();
            }
            loadHistory();
        } catch (error) {
            console.error("Failed to delete chat", error);
        }
    };

    useEffect(() => {
        loadHistory();
    }, []);

    // Send message
    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            const response = await aibaseService.sendMessage(userMessage, conversationId);

            if (response.success) {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    role: 'assistant',
                    text: response.data
                }]);

                if (!conversationId && response.conversationId) {
                    setConversationId(response.conversationId);
                    loadHistory();
                }
            }
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'assistant',
                text: error.response?.data?.message || "Sorry, I encountered an error. Please try again."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle file upload
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        setMessages(prev => [...prev, {
            id: Date.now(),
            role: 'assistant',
            text: `📤 Uploading ${file.name}...`
        }]);

        try {
            const response = await aibaseService.uploadDocument(file);

            if (response.success) {
                setMessages(prev => {
                    const newMsgs = [...prev];
                    newMsgs[newMsgs.length - 1].text = `✅ File "${file.name}" uploaded and processed. I can now answer questions about it.`;
                    return newMsgs;
                });
            }
        } catch (error) {
            console.error("Upload failed", error);
            setMessages(prev => {
                const newMsgs = [...prev];
                newMsgs[newMsgs.length - 1].text = `❌ Failed to upload "${file.name}". ${error.response?.data?.message || 'Please try again.'}`;
                return newMsgs;
            });
        } finally {
            setIsUploading(false);
            e.target.value = '';
        }
    };

    return (
        <div className="min-h-screen bg-secondary flex">
            {/* Conversation History Sidebar */}
            <div className={`${sidebarOpen ? 'w-80' : 'w-0'} bg-surface border-r border-border flex flex-col overflow-hidden transition-all duration-300`}>
                {sidebarOpen && (
                    <>
                        <div className="p-4 border-b border-border">
                            <div className="flex items-center gap-2 mb-4">
                                <button
                                    onClick={() => navigate(-1)}
                                    className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5 text-subtext" />
                                </button>
                                <h3 className="font-bold text-lg text-maintext">AI-Base</h3>
                            </div>
                            <Button
                                size="sm"
                                variant="secondary"
                                className="w-full justify-start gap-2"
                                onClick={startNewChat}
                            >
                                <Plus className="w-4 h-4" />
                                New Chat
                            </Button>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto space-y-2">
                            <p className="text-xs font-semibold text-subtext uppercase tracking-wider mb-2">Recent</p>
                            {history.length === 0 && (
                                <p className="text-xs text-subtext italic p-2">No past conversations.</p>
                            )}
                            {history.map((chat) => (
                                <div
                                    key={chat._id}
                                    onClick={() => loadConversation(chat._id)}
                                    className={`p-3 hover:bg-secondary rounded-xl cursor-pointer transition-colors group flex items-start justify-between gap-2 ${conversationId === chat._id ? 'bg-secondary border border-primary/20' : ''}`}
                                >
                                    <div className="min-w-0">
                                        <p className={`text-sm font-medium truncate transition-colors ${conversationId === chat._id ? 'text-primary' : 'text-maintext group-hover:text-primary'}`}>
                                            {chat.title}
                                        </p>
                                        <p className="text-xs text-subtext mt-1">
                                            {new Date(chat.lastMessageAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={(e) => handleDeleteChat(chat._id, e)}
                                        className="opacity-0 group-hover:opacity-100 p-1 text-subtext hover:text-red-500 hover:bg-red-50 rounded transition-all"
                                        title="Delete Chat"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-surface border-b border-border p-4 flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors md:hidden"
                    >
                        <MessageSquare className="w-5 h-5 text-subtext" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Bot className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="font-bold text-maintext">AI-Base Knowledge Assistant</h2>
                            <p className="text-xs text-subtext">RAG-powered document Q&A</p>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-secondary">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-primary/10 text-primary' : 'bg-surface text-maintext'}`}>
                                {msg.role === 'assistant' ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
                            </div>
                            <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'assistant' ? 'bg-surface text-maintext rounded-tl-none' : 'bg-primary text-white rounded-tr-none'}`}>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                                <Bot className="w-6 h-6" />
                            </div>
                            <div className="bg-surface p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin text-subtext" />
                                <span className="text-sm text-subtext">Thinking...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-border bg-surface">
                    <form onSubmit={handleSend} className="relative flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => document.getElementById('aibase-upload').click()}
                            className="p-3 text-subtext hover:text-primary hover:bg-secondary rounded-xl transition-colors"
                            title="Upload Document"
                            disabled={isUploading || isLoading}
                        >
                            {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Paperclip className="w-5 h-5" />}
                        </button>
                        <input
                            type="file"
                            id="aibase-upload"
                            className="hidden"
                            accept=".pdf,.txt"
                            onChange={handleFileUpload}
                            disabled={isUploading || isLoading}
                        />

                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask anything about your documents..."
                                className="w-full pl-6 pr-14 py-4 bg-secondary border-none rounded-2xl focus:ring-2 focus:ring-primary/20 text-maintext placeholder-subtext"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md shadow-primary/25"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                    <div className="text-center mt-2">
                        <p className="text-xs text-subtext">AI-Base can make mistakes. Verify important information.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiBaseChat;
