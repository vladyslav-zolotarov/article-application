import { UserCircleIcon } from '@heroicons/react/24/solid';
import React, { FC } from 'react';

const UserMinPostSkeleton: FC = () => {
    return (
        <div className='user__info flex items-center space-x-4'>
            <div className='user_avatar w-10 h-10 rounded-full'>
                <UserCircleIcon className="text-gray-200 dark:text-gray-700 rounded-full w-10 h-10" />
            </div>
            <div className='flex flex-col'>
                <span className='user_fullname h-3.5 w-40 mb-2 rounded-full bg-gray-200  dark:bg-gray-700' />
                <span className='h-3.5 w-60 bg-gray-200 dark:bg-gray-700 rounded-full' />
            </div>
        </div>
    );
};

export default UserMinPostSkeleton;