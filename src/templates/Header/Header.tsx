import React, { FC } from 'react';
import Search from '../../components/Search/Search';
import DarkModeToggler from '../../components/DarkModeToggler/DarkModeToggler';
import MenuSettings from '../../components/MenuSettings/MenuSettings';
import Navbar from '../../components/Navbar/Navbar';
import { RocketLaunchIcon } from '@heroicons/react/24/solid';

const Header: FC = () => {
    return (
        <header className='border-b border-gray-200 dark:border-gray-600 bg-white px-2 py-2.5 dark:bg-gray-900'>
            <div className="container flex flex-wrap items-center justify-between max-w-7xl mx-auto">
                <Navbar />
                <Search />
                <div className='flex'>
                    <DarkModeToggler />
                    <MenuSettings />
                </div>
            </div>
        </header>
    );
};

export default Header;