import React, { FC, useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import UserPost from '../../templates/UserPost/UserPost';
import { useUserStore } from '../../utils/store';

const UserPage: FC = () => {
    const { token, fetchUserInfo, userInfo } = useUserStore((state) => ({
        token: state.token,
        fetchUserInfo: state.fetchUserInfo,
        userInfo: state.userInfo,
    }), shallow);

    useEffect(() => {
        if (token && !userInfo.id) {
            fetchUserInfo(token)
        }
    }, [])

    return (
        <div className='user_page__container flex justify-center'>
            <UserPost user={userInfo} />
        </div>
    );
};

export default UserPage;