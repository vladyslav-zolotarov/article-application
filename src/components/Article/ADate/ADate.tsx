import React from 'react';
import { IArticleComponentProps } from '../../../types/types';
import format from 'date-fns/format';

export const ADate = ({ post, classList, classListSkeleton }: IArticleComponentProps) => {
    return (
        <div className={classList}>
            {post ?
                <span className='flex mr-4'>
                    {(format(new Date(`${post.createdAt}`), 'dd MMMM yyyy'))}
                </span> :
                <span className={classListSkeleton} />
            }
        </div>
    );
};