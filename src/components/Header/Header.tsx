import React, { FC, useState } from 'react';
import { shallow } from 'zustand/shallow';
import UserMinPost from '../../templates/UserMinPost/UserMinPost';
import { useApplicationStore, useArticleStore, useUserStore } from '../../utils/store';

import { HomeIcon, SunIcon, MoonIcon, ChevronDownIcon, UserCircleIcon, ArrowLeftOnRectangleIcon, ListBulletIcon, PencilIcon } from "@heroicons/react/24/solid";
import Search from '../Search/Search';

const Header: FC = () => {
    const [dropdownOpened, setDropdownOpened] = useState(false);

    const { darkMode, setDarkMode } = useApplicationStore((state) => ({
        darkMode: state.darkMode,
        setDarkMode: state.setDarkMode
    }), shallow)

    const { token, user, deleteToken } = useUserStore((state) => ({
        token: state.token,
        user: state.user,
        deleteToken: state.deleteToken,
    }), shallow);

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
        <header className='border-b border-gray-200 dark:border-gray-600 '>
            <nav className="bg-white px-2 py-2.5 dark:bg-gray-900">
                <div className="container flex flex-wrap items-center justify-between max-w-7xl mx-auto">
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li className='flex items-center text-gray-700 dark:text-gray-400 dark:hover:text-white hover:text-blue-700'>
                                <HomeIcon className="h-4 mr-2" />
                                <a href="/" className="block py-2 rounded md:border-0" aria-current="page">Home</a>
                            </li>
                            {/* <li className='flex items-center text-gray-700 dark:text-gray-400 dark:hover:text-white hover:text-blue-700'>
                                <ListBulletIcon className="h-5 mr-2" />
                                <a href="/posts/my" className="block py-2 rounded md:border-0" aria-current="page">List of my articles</a>
                            </li>
                            <li className='flex items-center text-gray-700 dark:text-gray-400 dark:hover:text-white hover:text-blue-700'>
                                <PencilIcon className="h-4 mr-2" />
                                <a href="/post/create" className="block py-2 rounded md:border-0" aria-current="page">Create new article</a>
                            </li> */}
                        </ul>
                    </div>
                    <Search />
                    <div className='flex'>
                        <button onClick={setDarkMode} className="relative inline-flex items-center cursor-pointer mr-8">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-300 md:hover:text-blue-700 md:dark:hover:text-white">{
                                darkMode ?
                                    <span className='flex items-center'><SunIcon className="h-6 mr-2" />Light mode</span> :
                                    <span className='flex items-center'><MoonIcon className="h-6 mr-2" />Dark mode</span>
                            }</span>
                        </button>

                        {token && user._id !== '' ?
                            <div className='relative'>
                                <button onClick={onDropdownToggle} className='flex items-center text-gray-900 dark:text-gray-300'>
                                    <div className='flex items-center'>
                                        {/* <img className='h-7 rounded-full mr-2' src={user.avatarUrl} /> */}
                                        <span className='text-sm font-medium text-gray-900 dark:text-gray-300 md:hover:text-blue-700 md:dark:hover:text-white'>{user.email}</span>
                                    </div>
                                    <ChevronDownIcon className="ml-2 h-4 text-gray-500" />
                                </button>
                                {dropdownOpened && <div className="z-10 absolute mt-2 right-0 bg-white rounded-lg shadow w-72 dark:bg-gray-800 dark:border-gray-700">
                                    <div className='text-sm px-4 py-2 border-b border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200'>
                                        <UserMinPost user={user} />
                                    </div>
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                        <li>
                                            <a href="/auth/me" className="flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><UserCircleIcon className="h-5 mr-2 text-gray-500" /><span>My account</span></a>
                                        </li>
                                        <li>
                                            <a href="/posts/my" className="flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><ListBulletIcon className="h-5 mr-2 text-gray-500" /><span>My articles</span></a>
                                        </li>
                                        <li className='mb-2'>
                                            <a href="/post/create" className="flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><PencilIcon className="h-5 mr-2 text-gray-500" /><span>Create new article</span></a>
                                        </li>
                                        <li className='border-t border-gray-200 dark:border-gray-600'>
                                            <a href="#" onClick={onSignOut} className="flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><ArrowLeftOnRectangleIcon className="h-5 mr-2 text-gray-500" /><span>Sign out</span></a>
                                        </li>
                                    </ul>
                                </div>}
                            </div> :
                            <div>
                                <ul className='flex flex-col p-4 mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                                    <li>
                                        <a className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent' href="/auth/login">Sign in</a>
                                    </li>
                                    <li>
                                        <a className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent' href="/auth/register">Sign up</a>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;