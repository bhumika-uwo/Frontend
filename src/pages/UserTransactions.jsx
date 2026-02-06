import React, { useState, useEffect } from 'react';
import { Clock, Loader2, Eye, X, Calendar, Receipt } from 'lucide-react';
import axios from 'axios';
import { API } from '../types';
import { useLanguage } from '../context/LanguageContext';

const UserTransactions = () => {
    const { t, language } = useLanguage();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API}/revenue/user/transactions`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('[USER TRANSACTIONS] Response:', response.data);
            setTransactions(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("Failed to fetch transactions:", err);
            setTransactions([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const formatDate = (dateString) => {
        const locale = language === 'Hindi' ? 'hi-IN' : 'en-IN';
        return new Date(dateString).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleViewDetails = (transaction) => {
        setSelectedTransaction(transaction);
        setShowDetailsModal(true);
    };

    return (
        <div className="p-4 md:p-8 h-full overflow-y-auto bg-gradient-to-br from-blue-100/40 via-white to-blue-200/30 dark:from-blue-900/20 dark:via-background dark:to-indigo-900/20">
            <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-maintext">{t('transactionsPage.title')}</h1>
                        <p className="text-sm text-subtext mt-1">{t('transactionsPage.subtitle')}</p>
                    </div>
                </div>

                <div className="bg-card md:border md:border-border rounded-xl md:rounded-[32px] overflow-hidden md:shadow-sm">
                    {/* Desktop Table View */}
                    <div className="hidden sm:block overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-secondary border-b border-border">
                                <tr>
                                    <th className="px-4 md:px-8 py-4 text-[10px] font-bold text-subtext uppercase tracking-[1.5px]">{t('invoicesPage.table.date')}</th>
                                    <th className="px-4 md:px-8 py-4 text-[10px] font-bold text-subtext uppercase tracking-[1.5px]">{t('transactionsPage.detailsModal.appAgent')}</th>
                                    <th className="px-4 md:px-8 py-4 text-[10px] font-bold text-subtext uppercase tracking-[1.5px]">{t('invoicesPage.table.plan')}</th>
                                    <th className="px-4 md:px-8 py-4 text-[10px] font-bold text-subtext uppercase tracking-[1.5px]">{t('invoicesPage.table.amount')}</th>
                                    <th className="px-4 md:px-8 py-4 text-[10px] font-bold text-subtext uppercase tracking-[1.5px]">{t('invoicesPage.table.status')}</th>
                                    <th className="px-4 md:px-8 py-4 text-[10px] font-bold text-subtext uppercase tracking-[1.5px] text-right">{t('actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="py-24 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                                <p className="mt-4 text-sm font-bold text-subtext">{t('transactionsPage.loading')}</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : transactions.length > 0 ? (
                                    transactions.map((transaction) => (
                                        <tr key={transaction._id} className="border-b border-secondary hover:bg-secondary transition-colors last:border-0 group">
                                            <td className="px-4 md:px-8 py-5">
                                                <span className="text-xs font-medium text-subtext">{formatDate(transaction.createdAt)}</span>
                                            </td>
                                            <td className="px-4 md:px-8 py-5">
                                                <span className="text-sm font-bold text-maintext group-hover:text-primary transition-colors">{transaction.agentId?.agentName || 'Unknown App'}</span>
                                            </td>
                                            <td className="px-4 md:px-8 py-5">
                                                <span className="text-xs font-medium text-subtext">{transaction.plan || 'N/A'}</span>
                                            </td>
                                            <td className="px-4 md:px-8 py-5">
                                                <span className="text-sm font-black text-maintext">₹{transaction.amount.toFixed(2)}</span>
                                            </td>
                                            <td className="px-4 md:px-8 py-5">
                                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${transaction.status === 'Success'
                                                    ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
                                                    : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20'
                                                    }`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${transaction.status === 'Success' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                                    {transaction.status === 'Success' ? t('success') : t('statusLabels.pending')}
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-8 py-5 text-right">
                                                <button
                                                    onClick={() => handleViewDetails(transaction)}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-maintext rounded-xl text-xs font-bold hover:bg-border transition-all"
                                                    title={t('details')}
                                                >
                                                    {t('details')}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="py-24 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-3">
                                                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-2">
                                                    <Receipt className="w-8 h-8 text-subtext/20" />
                                                </div>
                                                <p className="text-subtext text-sm font-medium">{t('noTransactions')}</p>
                                                <p className="text-subtext text-xs">{t('subscribeToSeeHistory')}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="sm:hidden space-y-4">
                        {loading ? (
                            <div className="py-20 text-center bg-card rounded-2xl border border-border">
                                <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
                                <p className="mt-4 text-sm font-bold text-subtext">{t('transactionsPage.loading')}</p>
                            </div>
                        ) : transactions.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {transactions.map((transaction) => (
                                    <div key={transaction._id} className="bg-card border border-border rounded-2xl p-5 shadow-sm active:scale-[0.98] transition-transform">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-bold text-subtext uppercase tracking-wider">{formatDate(transaction.createdAt)}</span>
                                                <span className="text-base font-bold text-maintext">{transaction.agentId?.agentName || 'Unknown App'}</span>
                                            </div>
                                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-black uppercase tracking-wider ${transaction.status === 'Success'
                                                ? 'bg-green-500/10 text-green-600 border-green-500/20'
                                                : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
                                                }`}>
                                                {transaction.status === 'Success' ? t('success') : t('statusLabels.pending')}
                                            </div>
                                        </div>

                                        <div className="flex items-end justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-subtext font-bold uppercase tracking-tight">{t('invoicesPage.table.plan')}</span>
                                                <span className="text-sm font-bold text-maintext">{transaction.plan || 'N/A'}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[10px] text-subtext font-bold uppercase tracking-tight block">{t('invoicesPage.table.amount')}</span>
                                                <span className="text-xl font-black text-maintext">₹{transaction.amount.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleViewDetails(transaction)}
                                            className="w-full mt-5 py-3 bg-secondary text-maintext rounded-xl text-xs font-bold hover:bg-border transition-all border border-border"
                                        >
                                            {t('details')}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center bg-card rounded-2xl border border-border">
                                <Receipt className="w-10 h-10 text-subtext/20 mx-auto mb-3" />
                                <p className="text-subtext text-sm font-medium">{t('noTransactions')}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Transaction Details Modal */}
                {showDetailsModal && selectedTransaction && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="bg-card w-full max-w-2xl rounded-2xl md:rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in duration-200">
                            <div className="p-4 md:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-maintext">{t('transactionsPage.detailsModal.title')}</h2>
                                    <button
                                        onClick={() => setShowDetailsModal(false)}
                                        className="p-2 hover:bg-secondary rounded-xl transition-colors"
                                    >
                                        <X className="w-5 h-5 text-subtext" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {/* Transaction ID & Date */}
                                    <div className="bg-secondary rounded-2xl p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs font-bold text-subtext uppercase mb-2">{t('transactionsPage.detailsModal.id')}</p>
                                                <p className="text-sm font-bold text-maintext break-all">#{selectedTransaction.transactionId || selectedTransaction._id.substring(selectedTransaction._id.length - 12).toUpperCase()}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-subtext uppercase mb-2">{t('transactionsPage.detailsModal.date')}</p>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-subtext" />
                                                    <p className="text-sm font-medium text-maintext">{formatDate(selectedTransaction.createdAt)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* App Details */}
                                    <div>
                                        <p className="text-xs font-bold text-subtext uppercase mb-3">{t('transactionsPage.detailsModal.appAgent')}</p>
                                        <div className="bg-card border border-border rounded-2xl p-4">
                                            <p className="text-lg font-bold text-maintext">{selectedTransaction.agentId?.agentName || 'Unknown App'}</p>
                                            <p className="text-xs text-subtext mt-1">{selectedTransaction.plan || t('plan')}</p>
                                        </div>
                                    </div>

                                    {/* Amount */}
                                    <div>
                                        <p className="text-xs font-bold text-subtext uppercase mb-3">{t('transactionsPage.detailsModal.amountPaid')}</p>
                                        <div className="bg-card border border-border rounded-2xl p-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-subtext">{t('transactionsPage.detailsModal.totalAmount')}</span>
                                                <span className="text-2xl font-black text-primary">₹{selectedTransaction.amount.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <p className="text-xs font-bold text-subtext uppercase mb-3">{t('transactionsPage.detailsModal.paymentStatus')}</p>
                                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${selectedTransaction.status === 'Success'
                                            ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
                                            : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20'
                                            }`}>
                                            <div className={`w-2 h-2 rounded-full ${selectedTransaction.status === 'Success' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                            <span className="text-sm font-bold uppercase">{selectedTransaction.status === 'Success' ? t('success') : t('pending')}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button
                                        onClick={() => setShowDetailsModal(false)}
                                        className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all"
                                    >
                                        {t('close')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserTransactions;
