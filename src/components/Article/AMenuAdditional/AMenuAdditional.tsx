import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { removeOneArticlePost } from '../../../api/endpoints';
import { useArticleStore, useUserStore } from '../../../utils/store';
import { IPost } from '../../../types/types';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

export const AMenuAdditional = ({ post, classList }: { post?: IPost, classList?: string }) => {
    const [dropdownOpened, setDropdownOpened] = useState(false);

    const { token } = useUserStore((state) => ({
        token: state.token,
    }), shallow);

    const { deleteArticle } = useArticleStore((state) => ({
        deleteArticle: state.deleteArticle,
    }), shallow)

    const onRemovePostHandler = () => {
        if (post) {
            removeOneArticlePost(post._id, token);
            deleteArticle(post._id);
        }
    }

    const onDropdownToggle = () => {
        setDropdownOpened(!dropdownOpened);
    }

    return (
        <div className={classList}>
            <button onClick={onDropdownToggle} className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
            </button>

            {dropdownOpened && post && <div className="z-10 top-full mt-3 absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul className="py-2 text-sm shadow border rounded-lg border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-200">
                    <li>
                        <Link to={`/post/edit/${post!._id}`} className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            <PencilIcon className="h-4 mr-2 text-gray-500" />
                            <span>Edit</span>
                        </Link>
                    </li>
                    <li>
                        <button onClick={onRemovePostHandler} className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            <TrashIcon className="h-4 mr-2 text-gray-500" />
                            <span>Remove</span>
                        </button>
                    </li>
                </ul>
            </div>
            }
        </div>
    );
};