import React, { FC } from 'react';
import { IUser } from '../../types/types';
import { UserCircleIcon } from "@heroicons/react/24/solid";


interface UserPostProps {
    user: IUser;
}

const UserMinPost: FC<UserPostProps> = ({ user }) => {
    return (
        <div className='user__info flex items-center'>
            <div className='user_avatar mr-2 w-8 h-8 rounded-full'>
                {user.avatarUrl ? <img className='rounded-full' src={user.avatarUrl} alt={user.fullName} /> :
                    <UserCircleIcon className="text-gray-500 rounded-full w-8 h-8" />
                }
            </div>
            <span className='user_fullname'>{user.fullName}</span>
        </div>
    );
};

export default UserMinPost;