import React from 'react';
import { IUser } from '../../types/types';
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO';
import { UserCircleIcon } from "@heroicons/react/24/solid";

const UserMin = ({ user, classList, classListSkeleton }: { user?: IUser, classList?: string, classListSkeleton?: string }) => {
    
    return (
        <>
            {user?._id ?
                <div className='user__info flex items-center space-x-4'>
                    <div className='user_avatar w-10 h-10 rounded-full'>
                        {user.avatarUrl ? <img className='rounded-full' src={user.avatarUrl} alt={user.fullName} /> :
                            <UserCircleIcon className="text-gray-500 rounded-full w-10 h-10" />
                        }
                    </div>
                    <div className='flex flex-col'>
                        <span className='user_fullname font-medium'>{user.fullName}</span>
                        <span className='text-sm'>Joined in {(format(parseISO(user.createdAt!), 'MMMM yyyy'))}</span>
                    </div>
                </div> :
                <div className='user__info flex items-center space-x-4'>
                    <div className='user_avatar w-10 h-10 rounded-full'>
                        <UserCircleIcon className="text-gray-200 dark:text-gray-700 rounded-full w-10 h-10" />
                    </div>
                    <div className='flex flex-col'>
                        <span className='user_fullname h-3.5 w-40 mb-2 rounded-full bg-gray-200  dark:bg-gray-700' />
                        <span className='h-3.5 w-60 bg-gray-200 dark:bg-gray-700 rounded-full' />
                    </div>
                </div>
            }
        </>
    );
};

export default UserMin;