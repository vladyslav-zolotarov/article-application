import React, { FC, ReactElement, ReactNode, useEffect } from 'react';
import { shallow } from 'zustand/shallow';
import List from '../../components/List/List/List';
import ArticlePost from '../../templates/ArticlePost/ArticlePost';
import { IPost } from '../../types/types';
import { useArticleStore, useUserStore } from '../../utils/store';

const MyArticlesListPage: FC = () => {
    const { user } = useUserStore((state) => ({
        user: state.user,
    }), shallow);
    const { myArticlesList, setMyArticlesList } = useArticleStore((state) => ({
        myArticlesList: state.myArticlesList,
        setMyArticlesList: state.setMyArticlesList,
    }), shallow);

    useEffect(() => {
        if (user._id) {
            setMyArticlesList(user._id);
        }
    }, [])

    return (
        <div>
            {myArticlesList.length &&
                <List
                    style='grid grid-cols-2 gap-7'
                    items={myArticlesList}
                    renderItem={(post: IPost) => <ArticlePost page='MyArticlesListPage' post={post} showMenu={true} key={post.title} />}
                />
            }
        </div>
    );
};

export default MyArticlesListPage;