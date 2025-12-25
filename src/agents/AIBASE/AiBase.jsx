import React, { useState } from 'react';
import { ArrowLeft, LayoutDashboard, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router';
import AiBaseDashboard from './AiBaseDashboard';
import AiBaseChat from './AiBaseChat';

const AiBase = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' or 'chat'

    // If showing full-page chat, render it directly
    if (activeTab === 'chat') {
        return <AiBaseChat />;
    }

    return (
        <div className="min-h-screen bg-secondary">
            {/* Header */}
            <header className="bg-surface border-b border-border px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-secondary rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-subtext" />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-maintext">AI-Base</h1>
                            <p className="text-sm text-subtext">Knowledge Hub Agent</p>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex items-center gap-2 bg-secondary p-1 rounded-xl">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'dashboard'
                                    ? 'bg-white text-primary shadow-sm'
                                    : 'text-subtext hover:text-maintext'
                                }`}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                        </button>
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'chat'
                                    ? 'bg-white text-primary shadow-sm'
                                    : 'text-subtext hover:text-maintext'
                                }`}
                        >
                            <MessageSquare className="w-4 h-4" />
                            Chat
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto">
                <AiBaseDashboard onNavigateToChat={() => setActiveTab('chat')} />
            </main>
        </div>
    );
};

export default AiBase;
