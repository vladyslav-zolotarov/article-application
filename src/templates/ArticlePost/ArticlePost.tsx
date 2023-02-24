import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IPost } from '../../types/types';
import { useArticleStore, useUserStore } from '../../utils/store';
import { EyeIcon } from "@heroicons/react/24/solid";
import { format } from 'date-fns';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

import UserMinPost from '../../components/UserMinPost/UserMinPost';
import { removeOneArticlePost } from '../../api/endpoints';
import { shallow } from 'zustand/shallow';

interface ArticlePostProps {
  post: IPost;
  showMenu?: boolean;
  page: string | 'HomePage' | 'MyArticleListPage' | 'ArticlePage';
}

const ArticlePost = ({ post, showMenu }: ArticlePostProps) => {
  const [dropdownOpened, setDropdownOpened] = useState(false);

  const { token } = useUserStore((state) => ({
    token: state.token,
  }), shallow);

  const { deleteArticle } = useArticleStore((state) => ({
    deleteArticle: state.deleteArticle,
  }), shallow)

  const onRemovePostHandler = () => {
    removeOneArticlePost(post._id, token);
    deleteArticle(post._id);
  }

  const onDropdownToggle = () => {
    setDropdownOpened(!dropdownOpened);
  }

  return (
    <div className='article__item p-5 border rounded-lg shadow bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
      <div className='article__item_user flex justify-between'>
        <UserMinPost user={post.user} />
        {showMenu &&
          <div className='flex items-center relative'>
            <button onClick={onDropdownToggle} className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
            </button>

            {dropdownOpened && <div className="z-10 top-full mt-3 absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
              <ul className="py-2 text-sm shadow border rounded-lg border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-200">
                <li>
                  <Link to={`/post/edit/${post._id}`} className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    <PencilIcon className="h-4 mr-2 text-gray-500" />
                    <span>Edit</span>
                  </Link>
                </li>
                <li>
                  <button onClick={onRemovePostHandler} className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    <TrashIcon className="h-4 mr-2 text-gray-500" />
                    <span>Remove</span>
                  </button>
                </li>
              </ul>
            </div>
            }
          </div>
        }
      </div>
      <div className='article__item_content mt-5'>
        <Link to={`/post/${post._id}`}>
          {post.imageUrl ? <img className='rounded-lg mb-6 h-52 w-full object-cover' alt={post.title} src={post.imageUrl} /> :
            <div className="flex mb-6 rounded-lg items-center justify-center w-full h-52 bg-gray-300 dark:bg-gray-700">
              <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
            </div>
          }
          <div className='flex items-center justify-between mb-3'>
            <h2 className='article__title block text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{post.title}</h2>
          </div>
        </Link>

        <div className='flex flex-wrap mb-3'>
          {post.tags[0] !== '' &&
            <ul className='flex items-center'>
              {post.tags[0].split(' ').map((tag, key) => {
                return <li className='bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300' key={post.text + tag + key}>#{tag}</li>
              })}
            </ul>
          }
        </div>
        <span className='mb-3 article__text line-clamp-2 block font-normal text-gray-700 dark:text-gray-400'>{post.text}</span>
        <div className='article__content_additional flex justify-end'>
          <span className='flex mr-4'>
            {(format(new Date(`${post.createdAt}`), 'dd MMMM yyyy'))}
          </span>
          <span className='article__viewsCount flex'>
            <EyeIcon className="h-6 mr-2 text-gray-500" />
            {post.viewsCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticlePost;