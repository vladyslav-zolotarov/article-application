import React, { FC } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IPost } from '../../types/types';
import { useArticleStore } from '../../utils/store';
import { EyeIcon } from "@heroicons/react/24/solid";
import { format } from 'date-fns';

import UserMinPost from '../UserMinPost/UserMinPost';

interface ArticlePostProps {
  post: IPost;
}

const ArticlePost: FC<ArticlePostProps> = ({ post }) => {
  const { setActiveArticleId } = useArticleStore();

  return (
    <div className='article__item p-5 max-w-4xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-7'>
      <UserMinPost user={post.user} />

      <div className='article__item_sub mt-5'>
        <Link onClick={() => setActiveArticleId(post._id)} to={`/post/${post._id}`}>
          <img className='rounded-lg mb-2 w-full' alt={post.title} src={post.imageUrl} />
          <h2 className='article__title mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{post.title}</h2>
        </Link>
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
        </div>
      </div>
    </div>
  );
};

export default ArticlePost;