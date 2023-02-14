import React, { useEffect, useState } from 'react';
import { shallow } from 'zustand/shallow';
import UserMinPost from '../../templates/UserMinPost/UserMinPost';
import { useDarkModeStore, useUserStore } from '../../utils/store';

import { SunIcon, MoonIcon, ChevronDownIcon, UserCircleIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";

const Header = () => {
    const [dropdownOpened, setDropdownOpened] = useState(false);

    const { darkMode, setDarkMode } = useDarkModeStore((state) => ({
        darkMode: state.darkMode,
        setDarkMode: state.setDarkMode
    }), shallow)

    const { token, fetchUserInfo, userInfo, deleteToken } = useUserStore((state) => ({
        token: state.token,
        fetchUserInfo: state.fetchUserInfo,
        userInfo: state.userInfo,
        deleteToken: state.deleteToken,
    }), shallow);

    useEffect(() => {
        if (token && !userInfo.id) {
            fetchUserInfo(token);
        }
    }, [])

    const onDropdownToggle = () => {
        setDropdownOpened(!dropdownOpened);
    }

    const onSignOut = () => {
        deleteToken();
    }

    return (
        <header className='border-b border-gray-200 dark:border-gray-600 '>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">List of posts</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Add new post</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <div className='flex'>
                        <button onClick={setDarkMode} className="relative inline-flex items-center cursor-pointer mr-16">
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 md:hover:text-blue-700 md:dark:hover:text-white">{
                                darkMode ?
                                    <span className='flex items-center'><SunIcon className="h-6 h-6 mr-2" />Light mode</span> :
                                    <span className='flex items-center'><MoonIcon className="h-6 h-6 mr-2" />Dark mode</span>
                            }</span>
                        </button>

                        {token ?
                            <div className='relative'>
                                <button onClick={onDropdownToggle} className='flex items-center text-gray-900 dark:text-gray-300'>
                                    <UserMinPost user={userInfo} />
                                    <ChevronDownIcon className="ml-2 h-4 text-gray-500" />
                                </button>
                                {dropdownOpened && <div className="z-10 absolute mt-2 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-800 dark:border-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                        <li>
                                            <a href="/auth/me" className="flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><UserCircleIcon className="h-5 mr-2 text-gray-500" /><span>My account</span></a>
                                        </li>
                                        <li>
                                            <a href="#" onClick={onSignOut} className="flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><ArrowLeftOnRectangleIcon className="h-5 mr-2 text-gray-500" /><span>Sign out</span></a>
                                        </li>
                                    </ul>
                                </div>}
                            </div> :
                            <div>
                                <ul className='flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
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