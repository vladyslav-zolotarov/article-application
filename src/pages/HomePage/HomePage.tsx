import React, { FC } from 'react';
import ArticleList from '../../templates/ArticleList/ArticleList';

const HomePage: FC = () => {
    return (
        <div className='home_page__container'>
            <ArticleList />
        </div>
    );
};

export default HomePage;