import React from 'react';
import { IPost } from '../../../types/types';

const ATitle = ({ post, classList, classListSkeleton }: { post?: IPost, classList: string, classListSkeleton?: string }) => {
    return (
        <div className={classList}>
            {post ?
                <h2 className='article__title'>{post.title}</h2> :
                <h2 className={`article__title ${classListSkeleton}`}></h2>
            }
        </div>
    );
};

export default ATitle;