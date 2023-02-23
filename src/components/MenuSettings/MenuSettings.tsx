import React, { FC, useState } from 'react';
import { shallow } from 'zustand/shallow';
import UserMinPost from '../../templates/UserMinPost/UserMinPost';
import { useArticleStore, useUserStore } from '../../utils/store';
import { ArrowLeftOnRectangleIcon, ChevronDownIcon, ListBulletIcon, PencilIcon, UserCircleIcon } from '@heroicons/react/24/solid';

const MenuSettings: FC = () => {
    const [dropdownOpened, setDropdownOpened] = useState(false);

    const { token, user, deleteToken } = useUserStore((state) => ({
        token: state.token,
        user: state.user,
        deleteToken: state.deleteToken,
    }), shallow)

    const { clearMyActircleList } = useArticleStore((state) => ({
        clearMyActircleList: state.clearMyActircleList,
    }), shallow);


    const onDropdownToggle = () => {
        setDropdownOpened(!dropdownOpened);
    }

    const onSignOut = () => {
        deleteToken();
        clearMyActircleList();
    }

    return (
        <>
            {token && user._id !== '' ?
                <div className='flex relative'>
                    <button onClick={onDropdownToggle} className='flex items-center text-gray-900 dark:text-gray-300'>
                        <div className='flex items-center'>
                            <span className='text-sm font-medium text-gray-900 dark:text-gray-300 md:hover:text-blue-700 md:dark:hover:text-white'>My account</span>
                        </div>
                        <ChevronDownIcon className="ml-2 h-4 text-gray-500" />
                    </button>
                    {dropdownOpened && <div className="z-10 absolute mt-4 top-full right-0 bg-white rounded-lg shadow w-72 dark:bg-gray-800 dark:border-gray-700">
                        <div className='text-sm px-4 py-2 border-b border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200'>
                            <UserMinPost user={user} />
                        </div>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                                <a href="/auth/me" className="menu-settings-link"><UserCircleIcon className="h-5 mr-2 text-gray-500" /><span>My account</span></a>
                            </li>
                            <li>
                                <a href="/posts/my" className="menu-settings-link"><ListBulletIcon className="h-5 mr-2 text-gray-500" /><span>My articles</span></a>
                            </li>
                            <li className='mb-2'>
                                <a href="/post/create" className="menu-settings-link"><PencilIcon className="h-5 mr-2 text-gray-500" /><span>Create new article</span></a>
                            </li>
                            <li className='border-t border-gray-200 dark:border-gray-600'>
                                <a href="#" onClick={onSignOut} className="menu-settings-link"><ArrowLeftOnRectangleIcon className="h-5 mr-2 text-gray-500" /><span>Sign out</span></a>
                            </li>
                        </ul>
                    </div>}
                </div> :
                <div>
                    <ul className='flex flex-col p-4 mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                        <li>
                            <a className='menu-setting-link-2' href="/auth/login">Sign in</a>
                        </li>
                        <li>
                            <a className='menu-setting-link-2' href="/auth/register">Sign up</a>
                        </li>
                    </ul>
                </div>
            }
        </>
    );
};

export default MenuSettings;