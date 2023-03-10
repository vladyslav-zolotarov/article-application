import { FC, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOneArticlePost } from '../../api/endpoints';
import { ArticleWrapper, ArticleDate, ArticleImage, ArticleTags, ArticleText, ArticleTitle, ArticleViewCount } from '../../components/Article/ArticleComponents';
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
        <div className='article_page__container'>
            <ArticleWrapper
                classList={'p-5 border rounded-lg shadow bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'}>
                <>
                    <div className='article__item_user flex justify-between'>
                    </div>
                    <ArticleImage post={selectedArticle}
                        classList={'mb-6 h-64 w-full'} />
                    <div className='flex justify-between'>
                        <ArticleTitle post={selectedArticle}
                            classList={'block text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-3'}
                            classListSkeleton={'h-8 w-60 rounded-full w-2/4 bg-gray-200 dark:bg-gray-700'} />
                        <div className='flex'>
                            <ArticleDate post={selectedArticle}
                                classList={'mb-3'}
                                classListSkeleton={'flex mr-4 h-4 rounded-full w-40 bg-gray-200 dark:bg-gray-700'} />
                            <ArticleViewCount post={selectedArticle}
                                classList={'mb-3 flex'}
                                classListSkeleton={'flex h-4 rounded-full w-14 bg-gray-200 dark:bg-gray-700'} />
                        </div>
                    </div>
                    <ArticleText post={selectedArticle}
                        classList={'mb-3 block font-normal text-gray-700 dark:text-gray-400'} />
                    <div className='flex flex-wrap mb-3'>
                        <ArticleTags post={selectedArticle}
                            classList={'bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300'}
                            classListSkeleton={'bg-gray-200 dark:bg-gray-700 h-5 w-14 mr-2 px-2.5 py-0.5 rounded-full'} />
                    </div>
                </>
            </ArticleWrapper>
        </div>
    );
};

export default ArticlePage;