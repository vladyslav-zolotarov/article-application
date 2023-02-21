import React, { FC, useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import UserPost from '../../templates/UserPost/UserPost';
import { useUserStore } from '../../utils/store';

const UserPage: FC = () => {
    const { token, fetchUserInfo, user } = useUserStore((state) => ({
        token: state.token,
        fetchUserInfo: state.fetchUser,
        user: state.user,
    }), shallow);

    useEffect(() => {
        if (token && !user._id) {
            fetchUserInfo(token)
        }
    }, [])

    return (
        <div className='user_page__container flex justify-center'>
            <UserPost user={user} />
        </div>
    );
};

export default UserPage;