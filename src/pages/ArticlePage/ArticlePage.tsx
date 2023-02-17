import { FC, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOneArticlePost } from '../../api/endpoints';
import ArticlePostSkeleton from '../../skeletons/ArticlePostSkeleton/ArticlePostSkeleton';
import { IPost } from '../../types/types';


const ArticlePage: FC = () => {
    const { id } = useParams();
    const [selectedArticle, setSelectedArticle] = useState<IPost>();
    const [isLoaded, setIsLoading] = useState(false);

    useEffect(() => {
        if (id) {
            (async () => {
                setIsLoading(true);

                try {
                    const response = await getOneArticlePost(id);
                    setSelectedArticle(response.data);
                } catch (e) {
                    console.log(e);
                } finally {
                    setIsLoading(false);
                }
            })()
        }
    }, [])

    return (
        isLoaded ? <ArticlePostSkeleton /> :
            <div className='article_page__container'>
                <div className='article__item_sub'>
                    <img alt={selectedArticle?.title} src={selectedArticle?.imageUrl} />
                    <div className='article__content'>
                        <h2 className='article__title'>Title: {selectedArticle?.title}</h2>
                        <span className='article__text'>Describe: {selectedArticle?.text}</span>

                        <div className='article__content_sub'>
                            <span className='article__date_created'>Created at: {selectedArticle?.createdAt}</span>
                            <span className='article__viewsCount'>Views count: {selectedArticle?.viewsCount}</span>
                        </div>
                    </div>
                    <ul className='article__item_tags'>
                        Tags:
                        {selectedArticle?.tags?.map((tag) => {
                            return <li key={tag}>{tag}</li>
                        })}
                    </ul>
                </div>
            </div>
    );
};

export default ArticlePage;