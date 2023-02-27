import React from 'react';
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO';

export const UDate = ({ createdAt, classList, label, classListLabel, classListSkeleton }: { createdAt?: string, classList?: string, label?: string, classListLabel?: string, classListSkeleton?: string }) => {
    return (
        createdAt ?
            <span className={classList}>{label && <span className={classListLabel}>{label}</span>} {(format(parseISO(createdAt), 'MMMM yyyy'))}</span> :
            <span className={classListSkeleton} />
    );
};