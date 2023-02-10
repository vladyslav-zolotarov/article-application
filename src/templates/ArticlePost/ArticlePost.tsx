import React, { FC } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IPosts } from '../../types/types';
import { useArticleStore } from '../../utils/store';

import UserPost from '../UserPost/UserPost';

interface ArticlePostProps {
  post: IPosts;
}

const ArticlePost: FC<ArticlePostProps> = ({ post }) => {
  const { setActiveArticleId } = useArticleStore();

  return (
    <li className='article__item'>
      {/* <UserPost user={post.user} /> */}

      <div className='article__item_sub'>
        <img alt={post.title} src={post.imageUrl} />
        <div className='article__content'>
          <Link onClick={() => setActiveArticleId(post._id)} to={`/posts/${post._id}`}>
            <h2 className='article__title'>Title: {post.title}</h2>
          </Link>
          <span className='article__text'>Describe: {post.text}</span>

          <div className='article__content_sub'>
            <span className='article__date_created'>Created at: {post.createdAt}</span>
            <span className='article__viewsCount'>Views count: {post.viewsCount}</span>
          </div>
        </div>
        <ul className='article__item_tags'>
          Tags:
          {post.tags.map((tag) => {
            return <li key={tag}>{tag}</li>
          })}
        </ul>
      </div>
    </li>
  );
};

export default ArticlePost;