import React, { useEffect, useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import { useArticleStore, useDarkModeStore } from './utils/store';
import { shallow } from 'zustand/shallow';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Header from './components/Header/Header';
import UserPage from './pages/UserPage/UserPage';
import NewArticlePage from './pages/NewArticlePage/NewArticlePage';

function App() {
  const [toggleDark, setToggleDark] = useState('');
  const { activeArticleId } = useArticleStore();
  const { darkMode, setDarkMode } = useDarkModeStore((state) => ({
    darkMode: state.darkMode,
    setDarkMode: state.setDarkMode
  }), shallow);

  useEffect(() => {
    if (darkMode) {
      setToggleDark('dark');
    } else {
      setToggleDark('light');
    }
  }, [darkMode])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/auth/register",
      element: <RegisterPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/auth/login",
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/auth/me",
      element: <UserPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/post/:id",
      element: <ArticlePage id={activeArticleId} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/post/create",
      element: <NewArticlePage />,
      errorElement: <ErrorPage />,
    }
  ]);

  return (
    <div className={`App flex flex-col min-h-screen ${toggleDark}`}>
      <Header />
      <div className='flex-1 text-slate-900 dark:text-slate-300 bg-white dark:bg-slate-900'>
        <div className='max-w-7xl mx-auto py-5'>
          <RouterProvider router={router} />
        </div>
      </div>
    </div>
  );
}

export default App;
