import React from 'react';
import { IArticleComponentProps } from '../../../types/types';
import { EyeIcon } from '@heroicons/react/24/solid';

export const AViewCount = ({ post, classList, classListSkeleton }: IArticleComponentProps) => {
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