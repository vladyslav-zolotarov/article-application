import React from 'react';
import { IUser } from '../../types/types';
import { UserAvatar, UserDate, UserFullname } from '../../components/User/UserComponents';

const UserMin = ({ user }: { user: IUser }) => {

    return (
        <div className='user__info flex items-center space-x-4'>
            <div className='user_avatar'>
                <UserAvatar
                    avatar={user?.avatarUrl}
                    classList={'rounded-full w-10 h-10'}
                    classListSkeleton={'text-gray-200 dark:text-gray-700 rounded-full w-10 h-10'} />
            </div>
            <div className='flex flex-col'>
                <UserFullname
                    fullName={user?.fullName}
                    classList={'user_fullname font-medium'}
                    classListSkeleton={'h-3.5 w-40 mb-2 rounded-full bg-gray-200 dark:bg-gray-700'} />
                <UserDate
                    createdAt={user?.createdAt}
                    label={'Joined in'}
                    classList={'text-sm'}
                    classListSkeleton={'h-3.5 w-60 bg-gray-200 dark:bg-gray-700 rounded-full'}
                />
            </div>
        </div>
    );
};

export default UserMin;