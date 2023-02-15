import React from 'react';
import ArticleList from '../../templates/ArticleList/ArticleList';
import BlogList from '../../templates/ArticleList/ArticleList';

const HomePage = () => {
    return (
        <div className='home_page__container'>
            <ArticleList />
        </div>
    );
};

export default HomePage;