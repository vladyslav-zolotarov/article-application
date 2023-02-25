import { FC, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOneArticlePost } from '../../api/endpoints';
import ADate from '../../components/Article/ADate/ADate';
import AImage from '../../components/Article/AImage/AImage';
import AText from '../../components/Article/AText/AText';
import ATitle from '../../components/Article/ATitle/ATitle';
import AViewCount from '../../components/Article/AViewCount/AViewCount';
import ArticlePostSkeleton from '../../skeletons/ArticlePostSkeleton/ArticlePostSkeleton';
import ArticlePost from '../../templates/ArticlePost/ArticlePost';
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
            <div className='article__item_sub'>
                <AImage post={selectedArticle} classList={'mb-6 h-64 w-full'} />
                <div className='flex justify-between'>
                    <ATitle post={selectedArticle} classList={'block text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-3'} classListSkeleton={'h-8 rounded-full w-2/4 bg-gray-200 dark:bg-gray-700'} />
                    <div className='flex'>
                        <ADate post={selectedArticle} classList={'mb-3'} classListSkeleton={'flex mr-4 h-4 rounded-full w-40 bg-gray-200 dark:bg-gray-700'} />
                        <AViewCount post={selectedArticle} classList={'mb-3 flex'} classListSkeleton={'flex h-4 rounded-full w-14 bg-gray-200 dark:bg-gray-700'} />
                    </div>
                </div>
                <AText post={selectedArticle} classList={'mb-3 block font-normal text-gray-700 dark:text-gray-400'} />
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