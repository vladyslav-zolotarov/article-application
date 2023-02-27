import React from 'react';

export const UEmail = ({ email, classList, label, classListLabel }: { email?: string, classList?: string, label?: string, classListLabel?: string }) => {
    return (
        <span className={classList}>{label && <span className={classListLabel}>{label}</span>} {email}</span>
    );
};