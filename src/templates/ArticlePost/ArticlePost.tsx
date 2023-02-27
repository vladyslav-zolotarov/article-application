import React from 'react';
import { Link } from 'react-router-dom';
import { IPost } from '../../types/types';
import UserMin from '../UserMin/UserMin';
import { ArticleWrapper, ArticleDate, ArticleImage, ArticleTags, ArticleText, ArticleTitle, ArticleViewCount, ArticleMenuAdditional } from '../../components/Article/ArticleComponents';

interface ArticlePostProps {
  post?: IPost;
  showMenu?: boolean;
}

const ArticlePost = ({ post, showMenu }: ArticlePostProps) => {

  return (
    <ArticleWrapper classList={'article__item p-5 border rounded-lg shadow bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'}>
      <>
        <div className='article__item_user flex justify-between'>
          <UserMin user={post?.user} />
          {showMenu &&
            <ArticleMenuAdditional post={post} 
              classList={'flex items-center relative'} />
          }
        </div>
        <div className='article__item_content mt-5'>
          <Link to={`/post/${post?._id}`}>
            <ArticleImage post={post} 
              classList={'mb-6 h-52 w-full'} />
            <ArticleTitle post={post} 
              classList={'block mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'} 
              classListSkeleton={'h-8 w-60 rounded-full w-2/4 bg-gray-200 dark:bg-gray-700'}/>
          </Link>

          <div className='flex flex-wrap mb-3'>
            <ArticleTags post={post}
              classList={'bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300'}
              classListSkeleton={'bg-gray-200 dark:bg-gray-700 h-5 w-14 mr-2 px-2.5 py-0.5 rounded-full'} />
          </div>

          <ArticleText post={post} 
            classList={'mb-3 line-clamp-2 block font-normal text-gray-700 dark:text-gray-400'} />
          <div className='article__content_additional flex justify-end'>
            <ArticleDate post={post} classList={'flex mr-4'} 
              classListSkeleton={'flex mr-4 h-4 rounded-full w-40 bg-gray-200 dark:bg-gray-700'} />
            <ArticleViewCount post={post} 
              classList={'flex'} 
              classListSkeleton={'flex h-4 rounded-full w-14 bg-gray-200 dark:bg-gray-700'} />
          </div>
        </div>
      </>
    </ArticleWrapper>
  );
};

export default ArticlePost;