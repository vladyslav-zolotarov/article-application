import React, { ChangeEvent, FC, ReactNode, useEffect, useState } from "react";
import { IPost } from "../../../types/types";
import { useArticleStore } from "../../../utils/store";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import {
  ArticleImage,
  ArticleText,
  ArticleTitle,
  ArticleViewCount,
} from "../../Article";

const Search: FC = () => {
  const [inputValue, setInputValue] = useState<string>();
  const [searchResult, setSearchResult] = useState<IPost[]>();
  const { articles } = useArticleStore((state) => ({
    articles: state.articles,
  }));

  const onHadleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputValue) {
      setSearchResult(
        [...articles].filter((item) => {
          const { title } = item;
          return title.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
        })
      );
    }
  }, [inputValue]);

  const searchResultContent: ReactNode = searchResult?.map((item) => {
    if (inputValue) {
      return (
        <li
          className="py-2 border-b border-gray-200 dark:border-gray-600"
          key={item._id}
        >
          <Link className="flex items-center" to={`/post/${item._id}`}>
            <ArticleImage post={item} classList={"h-12 w-24 mr-2"} />
            <ArticleTitle post={item} classList={"flex-1 mr-2"} />
            <ArticleViewCount
              post={item}
              classList={"flex w-16 items-center"}
            />
          </Link>
        </li>
      );
    }

    return null;
  });

  return (
    <form className="search_form">
      <div className="relative w-full">
        <input
          type="search"
          onChange={(e) => onHadleFilter(e)}
          id="search-dropdown"
          className="block p-2.5 w-96 z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-gray-100 border-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="Search article..."
          required
        />
        <button
          type="submit"
          className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <MagnifyingGlassIcon className="w-5 h-5" />
        </button>
        {inputValue && (
          <div className="search_result absolute z-10 mt-2 bg-white rounded-lg shadow w-full dark:bg-gray-800 dark:border-gray-700">
            {searchResult?.length ? (
              <ul className="search_result_content text-sm px-4 py-2 text-gray-700 dark:text-gray-200">
                {searchResultContent}
              </ul>
            ) : (
              <span className="flex text-sm px-4 py-4 text-gray-700 dark:text-gray-200">
                not found
              </span>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

export default Search;
