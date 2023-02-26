import React, { ReactNode } from 'react';

export const AWrapper = ({children, classList} : {children: ReactNode, classList?: string}) => {
    return (
        <div className={classList}>
            {children}
        </div>
    );
};