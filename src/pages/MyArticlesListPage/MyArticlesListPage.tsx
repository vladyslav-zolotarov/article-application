import React, { FC, ReactElement, ReactNode, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import List from '../../components/List/List/List';
import ArticlePost from '../../templates/ArticlePost/ArticlePost';
import { IPost } from '../../types/types';
import { useArticleStore, useUserStore } from '../../utils/store';

const MyArticlesListPage: FC = () => {
    let location = useLocation();
    const { user } = useUserStore((state) => ({
        user: state.user,
    }), shallow);
    const { myArticlesList, setMyArticlesList } = useArticleStore((state) => ({
        myArticlesList: state.myArticlesList,
        setMyArticlesList: state.setMyArticlesList,
    }), shallow);

    useEffect(() => {
        console.log('location', location)
        console.log('window.location.hostname', window.origin)

        if (user._id) {
            setMyArticlesList(user._id);
        }
    }, [])

    return (
        <div>
            <div className='flex justify-center mb-7'>
                <Link to={`${window.origin}/post/create`} className="py-2.5 px-5 mr-2 mt-8 w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center justify-center">
                    Add new article
                </Link>
            </div>
            {myArticlesList.length &&
                <List
                    style='grid grid-cols-2 gap-7'
                    items={myArticlesList}
                    renderItem={(post: IPost) => <ArticlePost post={post} showMenu={true} key={post.title} />}
                />
            }
        </div>
    );
};

export default MyArticlesListPage;