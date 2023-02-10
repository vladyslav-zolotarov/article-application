import React from 'react';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ArticleList from './templates/ArticleList/ArticleList';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import { useArticleStore } from './utils/store';

function App() {
  const { activeArticleId } = useArticleStore();  

  console.log('app', activeArticleId)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/posts",
      element: <ArticleList />
    },
    {
      path: "/posts/:id",
      element: <ArticlePage id={activeArticleId} />
    }
  ]);


  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
