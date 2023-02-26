import React from 'react';
import { IArticleComponentProps } from '../../../types/types';

export const ATags = ({ post, classList, classListSkeleton }: IArticleComponentProps) => {
    return (
        <ul className='flex items-center'>
            {post ?
                post.tags[0].split(' ').map((tag, key) => {
                    return <li className={classList} key={post.text + tag + key}>#{tag}</li>
                })
                :

                [...Array(5)].map((item, key) => {
                    return <li key={key} className={classListSkeleton} />
                })
            }
        </ul>
    );
};