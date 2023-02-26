import React, { FC } from 'react';
import { HomeIcon, ListBulletIcon, PencilIcon } from '@heroicons/react/24/solid';
import { NavLink } from 'react-router-dom';

const Navbar: FC = () => {
    return (
        <nav className="navbar">
            <button data-collapse-toggle="navbar" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            </button>
            <div className="hidden w-full md:block" id="navbar">
                <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li className='navbar-item'>
                        <HomeIcon className="h-4 mr-2" />
                        <NavLink to="/" className="navbar-link">Home</NavLink>
                    </li>
                    {/* <li className='navbar-item'>
                        <ListBulletIcon className="h-5 mr-2" />
                        <NavLink to="/posts/my" className="navbar-link">List of my articles</NavLink>
                    </li>
                    <li className='navbar-item'>
                        <PencilIcon className="h-4 mr-2" />
                        <NavLink to="/post/create" className="navbar-link">Create new article</NavLink>
                    </li> */}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;