import React from 'react';
import { userData } from '../../userStore/userData';
import { useRecoilValue } from 'recoil';
import { useLanguage } from '../../context/LanguageContext';

const UserDropdown = ({ isMobile = false }) => {
    const { user } = useRecoilValue(userData);
    const { t } = useLanguage();

    if (!user || !user.email) return null;

    const getDisplayName = () => {
        if (!user.name) return "U";
        if (user.name === 'Admin') return t('adminName');
        return user.name;
    };

    const displayName = getDisplayName();

    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${isMobile ? 'pr-1' : ''}`}>
            {/* Avatar */}
            <div className={`rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold uppercase shrink-0 overflow-hidden border border-primary/20 ${isMobile ? 'w-8 h-8 text-xs' : 'w-9 h-9 text-sm border-2 border-primary/30'}`}>
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt={displayName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            const parent = e.target.parentElement;
                            if (parent) {
                                parent.classList.add("flex", "items-center", "justify-center");
                                parent.innerText = displayName.charAt(0).toUpperCase();
                            }
                        }}
                    />
                ) : (
                    displayName.charAt(0).toUpperCase()
                )}
            </div>

            {/* User Name */}
            <div className="flex items-center gap-1.5">
                <span className={`font-bold text-maintext truncate ${isMobile ? 'text-xs max-w-[80px]' : 'text-sm'}`}>
                    {t('hi')}, {user.name === 'Admin' ? displayName : (displayName.split(' ')[0] || 'User')}
                </span>
            </div>
        </div>
    );
};

export default UserDropdown;
