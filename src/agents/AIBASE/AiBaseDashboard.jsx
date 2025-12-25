import React, { useState, useEffect } from 'react';
import { FileText, Upload, Trash2, MessageSquare, ArrowRight, Zap, Database } from 'lucide-react';
import { useNavigate } from 'react-router';
import Button from './components/Button';
import { aibaseService } from './services/aibaseApi';

const AiBaseDashboard = ({ onNavigateToChat }) => {
    const navigate = useNavigate();
    const [documents, setDocuments] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [stats, setStats] = useState({
        documents: 0,
        systemStatus: 'Operational'
    });

    const fetchDocuments = async () => {
        try {
            const response = await aibaseService.getDocuments();
            if (response.success) {
                setDocuments(response.data || []);
                setStats(prev => ({ ...prev, documents: response.data?.length || 0 }));
            }
        } catch (error) {
            console.error("Failed to fetch documents", error);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);

        try {
            const response = await aibaseService.uploadDocument(file);
            if (response.success) {
                fetchDocuments();
            }
        } catch (error) {
            console.error("Upload failed", error);
            alert("Upload failed: " + (error.response?.data?.message || error.message));
        } finally {
            setIsUploading(false);
            e.target.value = '';
        }
    };

    const handleDeleteDocument = async (id, e) => {
        e.stopPropagation();
        if (!window.confirm('Delete this document? This will update the AI knowledge base.')) return;

        try {
            await aibaseService.deleteDocument(id);
            fetchDocuments();
        } catch (error) {
            console.error("Delete failed", error);
            alert("Failed to delete document");
        }
    };

    return (
        <div className="space-y-8 p-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-maintext">AI-Base Knowledge Hub</h1>
                <p className="text-subtext mt-2 text-lg">Manage your documents and chat with AI about them</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-subtext font-medium">Total Documents</p>
                        <h3 className="text-2xl font-bold text-maintext">{stats.documents}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                        <Database className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm text-subtext font-medium">Vector Store</p>
                        <h3 className="text-2xl font-bold text-maintext">{stats.systemStatus}</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quick Actions */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-maintext">Quick Actions</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <button
                            className="p-6 bg-gradient-to-br from-primary to-blue-600 rounded-2xl text-white text-left group hover:opacity-95 transition-opacity relative overflow-hidden"
                            onClick={onNavigateToChat}
                        >
                            <div className="relative z-10">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4 text-white">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold">Start New Chat</h3>
                                <p className="text-blue-100 text-sm mt-1">Ask questions from your knowledge base</p>
                            </div>
                            <ArrowRight className="absolute bottom-6 right-6 w-6 h-6 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </button>
                    </div>

                    {/* Info Card */}
                    <div className="bg-surface/50 rounded-2xl p-6 border border-border">
                        <div className="flex items-start gap-4">
                            <Zap className="w-5 h-5 text-yellow-500 mt-1" />
                            <div>
                                <h4 className="font-semibold text-maintext">Hybrid Mode Active</h4>
                                <p className="text-sm text-subtext mt-1">
                                    AI-Base answers from your uploaded documents AND general knowledge when needed.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Knowledge Base Management */}
                <div className="bg-white rounded-2xl border border-border shadow-sm p-6 overflow-hidden flex flex-col">
                    <h2 className="text-lg font-semibold text-maintext mb-4">Knowledge Base</h2>

                    {/* Upload Area */}
                    <div className="mb-6 p-4 border-2 border-dashed border-primary/20 bg-primary/5 rounded-xl text-center">
                        <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                        <h3 className="text-sm font-medium text-maintext">Upload New Document</h3>
                        <p className="text-xs text-subtext mt-1 mb-3">Add PDFs or text files to train AI</p>
                        <input
                            type="file"
                            id="dashboard-upload"
                            className="hidden"
                            accept=".pdf,.txt"
                            onChange={handleFileUpload}
                            disabled={isUploading}
                        />
                        <Button
                            size="sm"
                            onClick={() => document.getElementById('dashboard-upload').click()}
                            isLoading={isUploading}
                        >
                            {isUploading ? 'Uploading...' : 'Choose File'}
                        </Button>
                    </div>

                    {/* Documents List */}
                    <div className="space-y-3 overflow-y-auto max-h-[300px] pr-2">
                        <p className="text-xs font-semibold text-subtext uppercase tracking-wider mb-2">
                            Active Documents ({documents.length})
                        </p>
                        {documents.length === 0 && (
                            <p className="text-xs text-subtext italic p-2">No documents uploaded yet.</p>
                        )}
                        {documents.map((doc) => (
                            <div key={doc._id} className="flex items-center gap-3 p-3 bg-surface rounded-lg group hover:border-primary/30 border border-transparent transition-all">
                                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary shadow-sm">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-maintext truncate" title={doc.filename}>{doc.filename}</p>
                                    <p className="text-xs text-subtext mt-0.5">Ready for RAG</p>
                                </div>
                                <button
                                    onClick={(e) => handleDeleteDocument(doc._id, e)}
                                    className="p-2 text-subtext hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete Document"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiBaseDashboard;
