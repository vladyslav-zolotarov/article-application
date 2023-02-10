import { FC, useState } from 'react';
import { useEffect } from 'react';
import { getOneArticlePost } from '../../api/endpoints';
import { IPosts } from '../../types/types';

interface ArticlePageProps {
    id: string;
}

const ArticlePage: FC<ArticlePageProps> = ({ id }) => {
    const [articleArticle, setArticleArticle] = useState<IPosts>();

    useEffect(() => {
        (async () => {
            try {
                const response = await getOneArticlePost(id);
                setArticleArticle(response.data)
            }
            catch (e) {
                console.log(e);
            }
        })()
    }, [])

    return (
        <div>
            <h1>Article Page</h1>

            <div className='article__item_sub'>
                <img alt={articleArticle?.title} src={articleArticle?.imageUrl} />
                <div className='article__content'>
                    <h2 className='article__title'>Title: {articleArticle?.title}</h2>
                    <span className='article__text'>Describe: {articleArticle?.text}</span>

                    <div className='article__content_sub'>
                        <span className='article__date_created'>Created at: {articleArticle?.createdAt}</span>
                        <span className='article__viewsCount'>Views count: {articleArticle?.viewsCount}</span>
                    </div>
                </div>
                <ul className='article__item_tags'>
                    Tags:
                    {articleArticle?.tags?.map((tag) => {
                        return <li key={tag}>{tag}</li>
                    })}
                </ul>
            </div>
        </div>
    );
};

export default ArticlePage;