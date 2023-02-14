import React, { FC, useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import UserPost from '../../templates/UserPost/UserPost';
import { useUserStore } from '../../utils/store';

const UserPage: FC = () => {
    const { token, fetchUserInfo, userInfo, deleteToken } = useUserStore((state) => ({
        token: state.token,
        fetchUserInfo: state.fetchUserInfo,
        userInfo: state.userInfo,
        deleteToken: state.deleteToken,
    }), shallow);

    useEffect(() => {
        if (token && !userInfo.id) {
            fetchUserInfo(token)
        }
    })

    return (
        <div className='user__page_container flex justify-center'>
            <UserPost user={userInfo} />
        </div>
    );
};

export default UserPage;