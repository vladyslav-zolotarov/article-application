import React from 'react';

export const UFullname = ({ fullName, classList, label, classListLabel, classListSkeleton }: { fullName?: string, classList?: string, label?: string, classListLabel?: string, classListSkeleton?: string }) => {
    return (
        fullName ? 
        <span className={classList}>{label && <span className={classListLabel}>{label}</span>} {fullName}</span> :
        <span className={classListSkeleton} />
    );
};