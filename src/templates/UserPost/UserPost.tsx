import React, { FC } from 'react';
import { IUser } from '../../types/types';
import { format } from 'date-fns';
import { useUserStore } from '../../utils/store';
import { shallow } from 'zustand/shallow';
import { useNavigate } from "react-router-dom";


interface UserPostProps {
    user: IUser;
}

const UserPost = ({user}: UserPostProps) => {
    let navigate = useNavigate();
    const { deleteToken } = useUserStore((state) => ({
        deleteToken: state.deleteToken,
    }), shallow);

    const onSignOut = () => {
        deleteToken();
        navigate('/');
    }
    
    return (
        <div className='user__info flex flex-col article__item p-5 max-w-4xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-7'>
            <div className='user_img__wrapper mb-4 flex justify-center'>
                <img className='rounded-full' src={user.avatarUrl} alt={user.fullName} />
            </div>
            <span className='mb-2 text-xl font-bold leading-none text-gray-900 dark:text-white'>Fullname:<span className='ml-2 font-normal'>{user.fullName}</span></span>
            <span className='mb-2 text-xl font-bold leading-none text-gray-900 dark:text-white'>Email:<span className='ml-2 font-normal'>{user.email}</span></span>
            <span className='mb-2 text-xl font-bold leading-none text-gray-900 dark:text-white'>Account created at:<span className='ml-2 font-normal'>{(format(new Date(`${user.createdAt}`), 'MMMM dd, yyyy'))}</span></span>
            <button onClick={onSignOut} className="py-2.5 px-5 mr-2 mt-8 w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center justify-center">Sign out</button>
        </div>
    );
};

export default UserPost;