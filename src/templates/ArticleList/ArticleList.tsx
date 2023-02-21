import { FC } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getArticlePosts } from '../../api/endpoints';
import { IPost } from '../../types/types';
import { shallow } from 'zustand/shallow';
import ArticlePost from '../ArticlePost/ArticlePost';
import List from '../../components/List/List/List';
import { useArticleStore } from '../../utils/store';
import ArticlePostSkeleton from '../../skeletons/ArticlePostSkeleton/ArticlePostSkeleton';

const ArticleList = ({ page }: { page: string }) => {
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

            renderItem={loading ? () => <ArticlePostSkeleton key={Math.random()} /> :
                (post: IPost) => <ArticlePost page={page} post={post} key={post.title} />
            }
        />
    );
};

export default ArticleList;