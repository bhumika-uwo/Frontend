import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, FileText, Scale, Eye, AlertTriangle } from 'lucide-react';
import ReportModal from '../Components/ReportModal/ReportModal';

const SecurityAndGuidelines = () => {
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const sections = [
        {
            id: 1,
            title: "1. Core Promise: 'Your Data is Yours'",
            icon: <Lock className="w-5 h-5 text-primary" />,
            content: (
                <div className="space-y-4">
                    <p className="text-subtext">A-Series™ operates under a strict <span className="text-maintext font-bold">"Zero-Training"</span> policy. Your private data (documents, chat logs, images) is never used to train our public models.</p>

                    <div className="pl-4 border-l-2 border-primary/20 space-y-3">
                        <div>
                            <h4 className="font-semibold text-maintext">1.1 Compliance with Indian Law (DPDP Act 2023)</h4>
                            <p className="text-sm text-subtext">As a "Data Fiduciary," we adhere to the Digital Personal Data Protection Act, 2023. This includes consent-based collection, right to withdrawal, and grievance redressal.</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-maintext">1.2 Right to be Forgotten</h4>
                            <p className="text-sm text-subtext">Upon request, A-Series™ will permanently delete all your account data, chat history, and generated assets within <span className="font-bold">30 days</span>.</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-maintext">1.3 Grievance Redressal</h4>
                            <p className="text-sm text-subtext">Our Data Protection Officer (DPO) handles privacy complaints within 72 hours. Contact: <a href="mailto:privacy@a-series.in" className="text-primary hover:underline">privacy@a-series.in</a></p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 2,
            title: "2. Technical Security (The 'Vertex Shield')",
            icon: <Shield className="w-5 h-5 text-primary" />,
            content: (
                <div className="space-y-3">
                    <p className="text-subtext">We leverage enterprise-grade security of Google Vertex AI. All data is <span className="font-bold">encrypted at rest (AES-256)</span> and in transit (TLS 1.2+).</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-subtext">
                        <div className="p-3 bg-surface rounded-lg border border-border">
                            <h4 className="font-bold text-maintext mb-1">Data Residency</h4>
                            <p>Data stored in Google Cloud India regions (Mumbai/Delhi) for Indian enterprise clients.</p>
                        </div>
                        <div className="p-3 bg-surface rounded-lg border border-border">
                            <h4 className="font-bold text-maintext mb-1">Access Control</h4>
                            <p>Strict IAM policies ensure even A-Series engineers cannot view private chats without audit.</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 3,
            title: "3. Acceptable Use Policy (Ethical Guardrails)",
            icon: <AlertTriangle className="w-5 h-5 text-primary" />,
            content: (
                <div className="space-y-3">
                    <p className="text-subtext">To maintain a safe ecosystem, we strictly prohibit:</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                            "NSFW/Adult Content generation",
                            "Hate Speech & Discrimination",
                            "Deepfakes & Impersonation",
                            "Political Campaigning & Propaganda",
                            "Unprofessional Medical/Legal Advice"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-subtext bg-surface p-2 rounded-lg border border-border">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                {item}
                            </li>
                        ))}
                    </ul>
                    <p className="text-xs text-subtext mt-2 italic">Violation of these policies will result in immediate account suspension.</p>
                </div>
            )
        },
        {
            id: 4,
            title: "4. AI Safety & Disclaimers",
            icon: <Scale className="w-5 h-5 text-primary" />,
            content: (
                <div className="space-y-3">
                    <div className="bg-surface/50 p-3 rounded-lg border border-border">
                        <h4 className="font-semibold text-maintext text-sm mb-1">4.1 Hallucination Warning</h4>
                        <p className="text-xs text-subtext">AI models can sometimes generate incorrect info. Users must verify critical facts (dates, math, historical events).</p>
                    </div>
                    <div className="bg-surface/50 p-3 rounded-lg border border-border">
                        <h4 className="font-semibold text-maintext text-sm mb-1">4.2 Watermarking (SynthID)</h4>
                        <p className="text-xs text-subtext">AI-generated media on Free/Starter plans embed a Digital Watermark (SynthID) for authenticity tracking.</p>
                    </div>
                </div>
            )
        },
        {
            id: 5,
            title: "5. File Upload & Document Security",
            icon: <FileText className="w-5 h-5 text-primary" />,
            content: (
                <div className="space-y-2">
                    <p className="text-subtext">Uploaded files are processed solely for functionality (document analysis, RAG).</p>
                    <p className="text-subtext">Restrictions apply to file size, type, and content to prevent abuse.</p>
                    <p className="text-subtext font-medium text-blue-500">Executable or malicious files may be rejected.</p>
                </div>
            )
        },
        {
            id: 6,
            title: "6. Cookies & Tracking Technologies",
            icon: <Eye className="w-5 h-5 text-primary" />,
            content: (
                <div className="space-y-2">
                    <p className="text-subtext">A-Series™ uses cookies for functionality, security, and optimization.</p>
                    <p className="text-subtext">Users may manage cookies via browser settings. See <span className="text-primary cursor-pointer hover:underline">Cookie Policy</span>.</p>
                </div>
            )
        },
        {
            id: 7,
            title: "7. Third-Party Services & Integrations",
            icon: <div className="w-5 h-5 flex items-center justify-center font-bold text-primary text-xs">3P</div>,
            content: <p className="text-subtext">Integrations with cloud providers and AI services are governed by contracts and limited to operational necessity.</p>
        },
        {
            id: 8,
            title: "8. Intellectual Property",
            icon: <div className="w-5 h-5 flex items-center justify-center font-bold text-primary text-xs">©</div>,
            content: <div className="text-subtext space-y-2">
                <p><strong>8.1 License:</strong> Limited, non-exclusive, non-transferable access.</p>
                <p><strong>8.2 Ownership:</strong> All rights remain with A-Series™ and UWO™.</p>
                <p><strong>8.3 Transfer:</strong> No transfer of ownership implies.</p>
            </div>
        },
        {
            id: 9,
            title: "9. Enforcement & Termination",
            icon: <AlertTriangle className="w-5 h-5 text-primary" />,
            content: <ul className="list-disc list-inside text-subtext text-sm">
                <li>Monitor for compliance</li>
                <li>Suspend/terminate for violations</li>
                <li>Immediate action for security threats</li>
            </ul>
        },
        {
            id: 10,
            title: "10. Policy Updates",
            icon: <FileText className="w-5 h-5 text-primary" />,
            content: <p className="text-subtext">Modifications may occur at any time. Continued use constitutes acceptance.</p>
        },
        {
            id: 11,
            title: "11. Contact Information",
            icon: <FileText className="w-5 h-5 text-primary" />,
            content: <p className="text-subtext">For questions, concerns, or rights-related requests, contact <a href="mailto:contact@a-series.in" className="text-primary hover:underline">contact@a-series.in</a>.</p>
        },
        {
            id: 12,
            title: "12. Incident Reporting & Support",
            icon: <AlertTriangle className="w-5 h-5 text-blue-500" />,
            content: (
                <div className="space-y-4">
                    <p className="text-subtext text-sm">If you witness any security violations, encounter technical issues, or need urgent assistance, please report them immediately.</p>
                    <div className="flex flex-wrap gap-4">
                        <button onClick={() => setIsReportModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-500/20 border border-blue-500/20 transition-colors">
                            <span>📧 Report in App:</span>
                            <span className="font-semibold">Open Form</span>
                        </button>
                        <a href="tel:+918358990909" className="flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-lg hover:bg-primary/10 border border-primary/20 transition-colors">
                            <span>📞 Support:</span>
                            <span className="font-semibold">+91 83589 90909</span>
                        </a>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="h-full flex flex-col bg-background overflow-hidden relative">
            {/* Header */}
            <header className="px-6 py-5 border-b border-border bg-secondary/30 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-maintext">Security & Guidelines</h1>
                        <p className="text-xs text-subtext">Last Updated: 17/12/2025</p>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                <div className="max-w-4xl mx-auto space-y-6 pb-10">

                    {/* Intro Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-secondary border border-border rounded-xl p-6 shadow-sm"
                    >
                        <p className="text-subtext leading-relaxed">
                            This Security & Guidelines section governs the acceptable use, data protection practices, and security standards applicable to <span className="text-maintext font-semibold">A-Series™</span>, operated by <span className="text-maintext font-semibold">UWO™</span>. By accessing or using the platform, you agree to comply with the terms set forth herein.
                        </p>
                    </motion.div>

                    {/* Grid for Sections */}
                    <div className="grid grid-cols-1 gap-4">
                        {sections.map((section, index) => (
                            <motion.div
                                key={section.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-secondary hover:bg-surface/50 border border-border rounded-xl p-5 hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex items-center gap-3 mb-3 border-b border-border/50 pb-2">
                                    {section.icon}
                                    <h3 className="text-lg font-semibold text-maintext">{section.title}</h3>
                                </div>
                                <div className="pl-1">
                                    {section.content}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact & Footer */}
                    <div className="mt-8">


                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 }}
                            className="bg-surface border border-border rounded-xl p-5"
                        >
                            <h3 className="font-bold text-maintext mb-2 flex items-center gap-2">
                                🧠 Legal Summary Statement
                            </h3>
                            <p className="text-subtext text-sm italic">
                                "These Security & Guidelines establish the framework for lawful use, data protection, AI governance, and operational security within the A-Series platform."
                            </p>
                        </motion.div>
                    </div>

                </div>
            </div>
            <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />
        </div>
    );
};

export default SecurityAndGuidelines;
