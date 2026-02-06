import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Scale, Eye, AlertTriangle, FileCheck, Landmark, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from '../Components/LanguageSwitcher/LanguageSwitcher';

const TrustSafetyCompliance = () => {
    const { t } = useLanguage();
    const sections = [
        {
            id: 'privacy',
            title: t('landing.trustSafety.section1.title'),
            icon: <Lock className="w-5 h-5 text-primary" />,
            content: (
                <div className="space-y-4">
                    <p className="text-subtext italic">{t('landing.trustSafety.section1.italicText')}</p>
                    <ul className="space-y-3">
                        <li className="flex gap-3">
                            <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
                            <div>
                                <h4 className="font-semibold text-maintext">{t('landing.trustSafety.section1.sub1Title')}</h4>
                                <p className="text-sm text-subtext">{t('landing.trustSafety.section1.sub1Text')}</p>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
                            <div>
                                <h4 className="font-semibold text-maintext">{t('landing.trustSafety.section1.sub2Title')}</h4>
                                <p className="text-sm text-subtext">{t('landing.trustSafety.section1.sub2Text')}</p>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
                            <div>
                                <h4 className="font-semibold text-maintext">{t('landing.trustSafety.section1.sub3Title')}</h4>
                                <p className="text-sm text-subtext">{t('landing.trustSafety.section1.sub3Text')}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            )
        },
        {
            id: 'compliance',
            title: t('landing.trustSafety.section2.title'),
            icon: <Landmark className="w-5 h-5 text-primary" />,
            content: (
                <div className="space-y-3">
                    <p className="text-subtext">{t('landing.trustSafety.section2.mainText')}</p>
                    <ul className="list-disc list-inside text-sm text-subtext space-y-2 ml-2">
                        <li><strong>{t('landing.trustSafety.section2.standard1').split(':')[0]}:</strong>{t('landing.trustSafety.section2.standard1').split(':')[1]}</li>
                        <li><strong>{t('landing.trustSafety.section2.standard2').split(':')[0]}:</strong>{t('landing.trustSafety.section2.standard2').split(':')[1]} <a href="mailto:admin@uwo24.com" className="text-primary hover:underline">admin@uwo24.com</a></li>
                        <li><strong>{t('landing.trustSafety.section2.standard3').split(':')[0]}:</strong>{t('landing.trustSafety.section2.standard3').split(':')[1]}</li>
                    </ul>
                </div>
            )
        },
        {
            id: 'security',
            title: t('landing.trustSafety.section3.title'),
            icon: <Shield className="w-5 h-5 text-primary" />,
            content: (
                <div className="overflow-hidden border border-border rounded-xl">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-secondary/50 text-maintext font-bold">
                            <tr>
                                <th className="p-3 border-b border-border">{t('landing.trustSafety.section3.layerHeader')}</th>
                                <th className="p-3 border-b border-border">{t('landing.trustSafety.section3.measureHeader')}</th>
                            </tr>
                        </thead>
                        <tbody className="text-subtext">
                            <tr>
                                <td className="p-3 border-b border-border font-medium text-maintext">{t('landing.trustSafety.section3.encryptionLabel')}</td>
                                <td className="p-3 border-b border-border">{t('landing.trustSafety.section3.encryptionText')}</td>
                            </tr>
                            <tr>
                                <td className="p-3 border-b border-border font-medium text-maintext">{t('landing.trustSafety.section3.residencyLabel')}</td>
                                <td className="p-3 border-b border-border">{t('landing.trustSafety.section3.residencyText')}</td>
                            </tr>
                            <tr>
                                <td className="p-3 border-b border-border font-medium text-maintext">{t('landing.trustSafety.section3.accessLabel')}</td>
                                <td className="p-3 border-b border-border">{t('landing.trustSafety.section3.accessText')}</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-medium text-maintext">{t('landing.trustSafety.section3.certLabel')}</td>
                                <td className="p-3">{t('landing.trustSafety.section3.certText')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        },
        {
            id: 'usage',
            title: t('landing.trustSafety.section4.title'),
            icon: <AlertTriangle className="w-5 h-5 text-primary" />,
            content: (
                <div className="space-y-4">
                    <p className="text-sm text-subtext">{t('landing.trustSafety.section4.intro')}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                            <h4 className="font-bold text-maintext text-xs uppercase mb-2">{t('landing.trustSafety.section4.prohibitedTitle')}</h4>
                            <ul className="text-xs text-subtext space-y-1">
                                <li>• {t('landing.trustSafety.section4.item1')}</li>
                                <li>• {t('landing.trustSafety.section4.item2')}</li>
                                <li>• {t('landing.trustSafety.section4.item3')}</li>
                            </ul>
                        </div>
                        <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg">
                            <h4 className="font-bold text-maintext text-xs uppercase mb-2">{t('landing.trustSafety.section4.highRiskTitle')}</h4>
                            <ul className="text-xs text-subtext space-y-1">
                                <li>• {t('landing.trustSafety.section4.item4')}</li>
                                <li>• {t('landing.trustSafety.section4.item5')}</li>
                                <li>• {t('landing.trustSafety.section4.item6')}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'transparency',
            title: t('landing.trustSafety.section5.title'),
            icon: <Eye className="w-5 h-5 text-primary" />,
            content: (
                <div className="space-y-3 text-sm text-subtext">
                    <p>{t('landing.trustSafety.section5.item1')}</p>
                    <p>{t('landing.trustSafety.section5.item2')}</p>
                    <p>{t('landing.trustSafety.section5.item3')}</p>
                </div>
            )
        }
    ];

    return (
        <div className="h-full flex flex-col bg-background overflow-hidden relative">
            <header className="px-6 py-5 border-b border-border bg-secondary/30 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <FileCheck className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-maintext">{t('landing.trustSafety.pageTitle')}</h1>
                            <p className="text-xs text-subtext">{t('landing.trustSafety.lastUpdated')} {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-20">
                <div className="max-w-4xl mx-auto space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-primary/5 border border-primary/10 rounded-2xl p-6"
                    >
                        <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                            <Zap className="w-5 h-5" /> {t('landing.trustSafety.heroTitle')}
                        </h2>
                        <p className="text-subtext leading-relaxed text-sm">
                            {t('landing.trustSafety.heroText')}
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {sections.map((section, idx) => (
                            <motion.section
                                key={section.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-secondary border border-border rounded-2xl p-6 shadow-sm"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-surface rounded-lg">
                                        {section.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-maintext">{section.title}</h3>
                                </div>
                                <div>{section.content}</div>
                            </motion.section>
                        ))}
                    </div>

                    <div className="bg-surface border border-border rounded-xl p-5 text-center">
                        <p className="text-subtext text-xs italic">
                            {t('landing.trustSafety.footerNote')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrustSafetyCompliance;
