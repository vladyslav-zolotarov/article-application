import React from 'react';
import { IPost } from '../../../types/types';
import { RocketLaunchIcon } from '@heroicons/react/24/solid';

const AImage = ({ post, classList }: { post?: IPost, classList: string }) => {
    return (
        <div className={classList}>
            {post && post.imageUrl ?
                <div className="flex items-center justify-center h-full w-full">
                    <img className='rounded-lg h-full w-full object-cover' alt={post.title} src={post.imageUrl} />
                </div> :
                <div className="flex items-center justify-center rounded-lg w-full h-full bg-gray-300 dark:bg-gray-700">
                    <RocketLaunchIcon className="h-1/4 w-1/4 text-gray-200" />
                </div>
            }
        </div>
    );
};

export default AImage;