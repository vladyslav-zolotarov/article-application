import React, { ChangeEvent, FC, ReactNode, useEffect, useState } from 'react';
import { IPost } from '../../types/types';
import { useArticleStore } from '../../utils/store';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom';
import { ArticleImage } from '../Article/article';

const Search: FC = () => {
    const [inputValue, setInputValue] = useState<string>();
    const [searchResult, setSearchResult] = useState<IPost[]>();
    const { articles } = useArticleStore((state) => ({
        articles: state.articles,
    }))

    const onHadleFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    useEffect(() => {
        if (inputValue) {
            setSearchResult([...articles].filter(item => {
                const { title } = item;
                return title.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
            }))
        }
    }, [inputValue])

    const searchResultContent: ReactNode = searchResult?.map(item => {
        if (inputValue) {
            return (
                <li className='py-2 border-b border-gray-200 dark:border-gray-600' key={item._id}>
                    <Link className='flex items-center' to={`/post/${item._id}`}>
                        {/* {item.imageUrl ? <img className='rounded-lg mr-2 h-12 w-24 object-cover' alt={item.title} src={item.imageUrl} /> :
                            <div className="flex mr-2 rounded-lg items-center justify-center h-12 w-24 bg-gray-300 dark:bg-gray-700">
                                <svg className="w-6 h-6 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                            </div>
                        } */}
                        <ArticleImage post={item} classList={'h-12 w-24 mr-2'} />
                        <span className='flex-1'>{item.title}</span>
                    </Link>
                </li>
            )
        }

        return null;
    })

    return (
        <form className='search_form'>
            <div className="relative w-full">
                <input type="search" onChange={(e) => onHadleFilter(e)} id="search-dropdown" className="block p-2.5 w-80 z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-gray-100 border-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search article..." required />
                <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
                {inputValue &&
                    <div className='search_result absolute z-10 mt-2 bg-white rounded-lg shadow w-full dark:bg-gray-800 dark:border-gray-700'>
                        {searchResult?.length ?
                            <ul className='search_result_content text-sm px-4 py-2 text-gray-700 dark:text-gray-200'>
                                {searchResultContent}
                            </ul> :
                            <span className='text-sm px-4 py-2 text-gray-700 dark:text-gray-200'>not found</span>
                        }
                    </div>
                }
            </div>
        </form>
    );
};

export default Search;