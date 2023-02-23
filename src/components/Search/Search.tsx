import React, { ChangeEvent, FC, ReactNode, useEffect, useState } from 'react';
import { IPost } from '../../types/types';
import { useArticleStore } from '../../utils/store';

const Search: FC = () => {
    const [inputValue, setInputValue] = useState<string>();
    const [searchResult, setSearchResult] = useState<IPost[]>();
    const { articles } = useArticleStore((state) => ({
        articles: state.articles,
    }))

    const onHadleFilter = (e: ChangeEvent<HTMLInputElement>) => {
        let filteredArticles = [...articles];
        setInputValue(e.target.value)

        filteredArticles = filteredArticles.filter(item => {
            const { title } = item;
            return title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
        })
        setSearchResult(filteredArticles)
    }

    const searchResultContent: ReactNode = searchResult?.map(item => {
        if (inputValue) {
            return (
                <li className='py-2 border-b border-gray-200 dark:border-gray-600' key={item._id}>
                    <a href={`/post/${item._id}`}><span>{item.title}</span></a>
                </li>
            )
        }

        return null;
    })

    return (
        <div>
            <form>
                <div className="flex">
                    <div className="relative w-full">
                        <input type="search" onChange={(e) => onHadleFilter(e)} id="search-dropdown" className="block p-2.5 w-80 z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-gray-100 border-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
                        <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <span className="sr-only">Search</span>
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
                </div>
            </form>
        </div>
    );
};

export default Search;