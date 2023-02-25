import React from 'react';
import { IPost } from '../../../types/types';

const AText = ({ post, classList }: { post?: IPost, classList: string }) => {
    return (
        <div className={classList}>
            {post ?
                <span className='article__text'>{post.text}</span> :
                <span className='article__text text-gray-700 dark:text-gray-400'>
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </span>
            }
        </div>
    );
};

export default AText;