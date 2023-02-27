import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export const UAvatar = ({ avatar, classList, classListSkeleton }: { avatar?: string, classList?: string, classListSkeleton?: string }) => {
    return (
        <div className={classList}>
            {
                avatar ? <img className={'rounded-full w-full h-full'} src={avatar} alt={avatar} /> :
                    <UserCircleIcon className={classListSkeleton} />
            }
        </div>
    );
};