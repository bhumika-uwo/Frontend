import React from 'react';
import { userData } from '../../userStore/userData';
import { useRecoilValue } from 'recoil';
import { useLanguage } from '../../context/LanguageContext';

const UserDropdown = ({ isMobile = false }) => {
    const { user } = useRecoilValue(userData);
    const { t } = useLanguage();

    if (!user || !user.email) return null;

    const getDisplayName = () => {
        if (user.role && user.role.toLowerCase() === 'admin') return t('adminName') || "Admin";
        if (user.name === 'Admin') return t('adminName') || "Admin";
        return user.name || "User";
    };

    const displayName = getDisplayName();

    return (
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${isMobile ? 'pr-1' : ''}`}>
            {/* Avatar */}


            {/* User Name */}
            <div className="flex items-center gap-1.5">
                <span className={`font-bold text-maintext truncate ${isMobile ? 'text-xs max-w-[80px]' : 'text-sm'}`}>
                    {t('hi')}, {user.role?.toLowerCase() === 'admin' ? displayName : (displayName.split(' ')[0] || 'User')}
                </span>
            </div>
        </div>
    );
};

export default UserDropdown;
