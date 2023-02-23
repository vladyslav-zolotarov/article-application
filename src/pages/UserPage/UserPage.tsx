import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { useUserStore } from '../../utils/store';
import { format } from 'date-fns';

const UserPage: FC = () => {
    let navigate = useNavigate();

    const { token, user, fetchUserInfo, deleteToken } = useUserStore((state) => ({
        token: state.token,
        user: state.user,
        fetchUserInfo: state.fetchUser,
        deleteToken: state.deleteToken,
    }), shallow);


    useEffect(() => {
        if (token && !user._id) {
            fetchUserInfo(token)
        }
    }, [])

    const onSignOut = () => {
        deleteToken();
        navigate('/');
    }


    return (
        <div className='user_page__container flex justify-center'>
            <div className='user__info flex flex-col article__item p-5 max-w-4xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-7'>
                <div className='user_img__wrapper mb-4 flex justify-center'>
                    <img className='rounded-full' src={user.avatarUrl} alt={user.fullName} />
                </div>
                <span className='user__info-text'>Fullname:<span className='ml-2 font-normal'>{user.fullName}</span></span>
                <span className='user__info-text'>Email:<span className='ml-2 font-normal'>{user.email}</span></span>
                <span className='user__info-text'>Account created at:<span className='ml-2 font-normal'>{(format(new Date(`${user.createdAt}`), 'MMMM dd, yyyy'))}</span></span>
                <button onClick={onSignOut} className="py-2.5 px-5 mr-2 mt-8 w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center justify-center">Sign out</button>
            </div>
        </div>
    );
};

export default UserPage;