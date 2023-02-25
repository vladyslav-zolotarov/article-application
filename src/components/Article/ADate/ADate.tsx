import React from 'react';
import { IPost } from '../../../types/types';
import format from 'date-fns/format';

const ADate = ({ post, classList, classListSkeleton }: { post?: IPost, classList: string, classListSkeleton?: string }) => {
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

export default ADate;