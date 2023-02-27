import React, { FC } from 'react';

const Footer: FC = () => {
    return (
        <div className='footer border-t border-gray-200 dark:border-gray-600 bg-white px-2 py-8 dark:bg-gray-900'>
            <div className='container flex flex-wrap items-center justify-center max-w-7xl mx-auto'>
                <h2 className='flex items-center text-gray-700 dark:text-gray-400 '>Created by <a className='mr-2 ml-2 font-bold dark:hover:text-white hover:text-blue-700' href='https://github.com/vladyslav-zolotarov'>Vladyslav Zolorov</a> © 2023</h2>
            </div>
        </div>
    );
};

export default Footer;