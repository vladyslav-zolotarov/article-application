import React from 'react';
import { IPost } from '../../../types/types';
import { EyeIcon } from '@heroicons/react/24/solid';

const AViewCount = ({ post, classList, classListSkeleton }: { post?: IPost, classList: string, classListSkeleton?: string }) => {
    return (
        <div className={classList}>
            {post ?
                <>
                    <EyeIcon className="h-6 mr-2 text-gray-500" />
                    {post.viewsCount}
                </> :
                <span
                    className={classListSkeleton}
                />
            }
        </div>
    );
};

export default AViewCount;