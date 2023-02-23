import React, { FC } from 'react';
import { useApplicationStore } from '../../utils/store';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { shallow } from 'zustand/shallow';

const DarkModeToggler: FC = () => {
    const { darkMode, setDarkMode } = useApplicationStore((state) => ({
        darkMode: state.darkMode,
        setDarkMode: state.setDarkMode,
    }), shallow)

    return (
        <button onClick={setDarkMode} className="relative inline-flex items-center cursor-pointer mr-8">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-300 md:hover:text-blue-700 md:dark:hover:text-white">{
                darkMode ?
                    <span className='flex items-center'><SunIcon className="h-6 mr-2" /></span> :
                    <span className='flex items-center'><MoonIcon className="h-6 mr-2" /></span>
            }</span>
        </button>
    );
};

export default DarkModeToggler;