import React from 'react';
import { IUser } from '../../types/types';
import { UserCircleIcon } from "@heroicons/react/24/solid";
// import { format } from 'date-fns';
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO';

interface UserPostProps {
    user: IUser;
}

const UserMinPost = ({ user }: UserPostProps) => {
    return (
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
        </div>
    );
};

export default UserMinPost;