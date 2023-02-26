import { FC } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { IPost } from '../../types/types';
import { shallow } from 'zustand/shallow';
import ArticlePost from '../ArticlePost/ArticlePost';
import List from '../../components/List/List/List';
import { useArticleStore } from '../../utils/store';

const ArticleList = () => {
    const { articles, loading, error, fetchArticles } = useArticleStore((state) => ({
        articles: state.articles,
        loading: state.loading,
        error: state.error,
        fetchArticles: state.fetchAllArticles,
    }), shallow)

    useEffect(() => {
        fetchArticles()
    }, [])

    return (
        <List
            style='grid grid-cols-2 gap-7'
            items={articles ? articles : Array(2)}

            renderItem={
                loading ? () => <ArticlePost key={Math.random()} /> :
                (post: IPost) => <ArticlePost post={post} key={post.title} />
            }
        />
    );
};

export default ArticleList;