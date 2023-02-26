import React from 'react';
import { IArticleComponentProps } from '../../../types/types';

export const ATitle = ({ post, classList, classListSkeleton }: IArticleComponentProps) => {
    return (
        <div className={classList}>
            {post ?
                <h2 className='article__title'>{post.title}</h2> :
                <h2 className={`article__title ${classListSkeleton}`}></h2>
            }
        </div>
    );
};