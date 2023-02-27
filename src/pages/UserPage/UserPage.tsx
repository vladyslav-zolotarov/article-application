import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { useUserStore } from '../../utils/store';
import { format } from 'date-fns';
import { UserAvatar, UserDate, UserEmail, UserFullname } from '../../components/User/UserComponents';

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
                <UserAvatar 
                    avatar={user?.avatarUrl}
                    classList={'user_img__wrapper mb-4 flex justify-center w-56 h-56'}
                    classListSkeleton={'text-gray-200 dark:text-gray-700 rounded-full w-56 h-56'}
                />
                <UserFullname
                    fullName={user?.fullName}
                    classList={'user__info-text'}
                />
                <UserEmail
                    email={user?.email}
                    classList={'user__info-text'}
                />
                <UserDate 
                    createdAt={user?.createdAt}
                    classList={'user__info-text'}
                    label={'Joined in'}
                />
                <button onClick={onSignOut} className="py-2.5 px-5 mr-2 mt-8 w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center justify-center">Sign out</button>
            </div>
        </div>
    );
};

export default UserPage;