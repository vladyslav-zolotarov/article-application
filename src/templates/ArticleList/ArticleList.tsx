import { FC } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getArticlePosts } from '../../api/endpoints';
import { IPosts } from '../../types/types';

import ArticlePost from '../ArticlePost/ArticlePost';
import List from '../../components/List/List/List';

const ArticleList: FC = () => {
    const [articles, setArticles] = useState<IPosts[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await getArticlePosts();
                setArticles(response.data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, [])

    return (
        <List
            items={articles}
            renderItem={(post: IPosts) => <ArticlePost post={post} key={post.title} />}
        />
    );
};

export default ArticleList;