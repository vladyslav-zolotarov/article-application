import React, { FC } from 'react';

const ArticlePostSkeleton: FC = () => {
    return (
        <div className='article__item p-5 max-w-4xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-7' >
            <div className='flex h-8 justify-between'>
                <div className="flex items-center w-full">
                    <svg className="text-gray-200 h-full mr-2 dark:text-gray-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
                    <div className="rounded-full h-5 w-60 bg-gray-200  dark:bg-gray-700"></div>
                </div>
                <div className="flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                </div>
            </div>
            <div className='article__item_sub mt-5'>
                <div className="flex mb-6 rounded-lg items-center justify-center w-full h-96 bg-gray-200 dark:bg-gray-700">
                    <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                </div>
                <h2 className='article__title h-8 rounded-full w-60 mb-3 bg-gray-200 dark:bg-gray-700'></h2>

                <div className='article__content'>
                    <span className='article__text mb-3 text-gray-700 dark:text-gray-400'>
                        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </span>
                </div>
                {/* 
                <div className='article__content'>
                    <span className='article__text mb-3 font-normal text-gray-700 dark:text-gray-400'>{post.text}</span>

                    <span className='article__viewsCount flex'>
                        <EyeIcon className="h-6 mr-2 text-gray-500" />
                        {post.viewsCount}
                    </span>

                    {post.tags && <ul className='article__item_tags'>
                        Tags:
                        {post.tags.map((tag) => {
                            return <li key={tag}>{tag}</li>
                        })}
                    </ul>}
                </div> */}
            </div>
        </div >
    );
};

export default ArticlePostSkeleton;