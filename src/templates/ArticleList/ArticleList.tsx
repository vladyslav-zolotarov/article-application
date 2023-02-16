import { FC } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getArticlePosts } from '../../api/endpoints';
import { IPost } from '../../types/types';
import { shallow } from 'zustand/shallow';
import ArticlePost from '../ArticlePost/ArticlePost';
import List from '../../components/List/List/List';
import { useArticleListStore } from '../../utils/store';
import ArticlePostSkeleton from '../../skeletons/ArticlePostSkeleton/ArticlePostSkeleton';

const ArticleList: FC = () => {
    const { articles, loading, error, fetchArticles } = useArticleListStore((state) => ({
        articles: state.articles,
        loading: state.loading,
        error: state.error,
        fetchArticles: state.fetchArticles,
    }), shallow)

    useEffect(() => {
        fetchArticles()
    }, [])

    return (
        loading ? <ArticlePostSkeleton /> :
        <List
            items={articles}
            renderItem={(post: IPost) => <ArticlePost post={post} key={post.title} />}
        />
    );
};

export default ArticleList;