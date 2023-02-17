import React, { useEffect, useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import {  useArticleStore, useDarkModeStore, useUserStore } from './utils/store';
import { shallow } from 'zustand/shallow';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Header from './components/Header/Header';
import UserPage from './pages/UserPage/UserPage';
import NewArticlePage from './pages/NewArticlePage/NewArticlePage';
import EditArticlePage from './pages/EditArticlePage/EditArticlePage';

function App() {
  const { darkMode } = useDarkModeStore((state) => ({
    darkMode: state.darkMode,
  }), shallow);

  const { token, fetchUserInfo, userInfo } = useUserStore((state) => ({
    token: state.token,
    fetchUserInfo: state.fetchUserInfo,
    userInfo: state.userInfo,
    deleteToken: state.deleteToken,
  }), shallow);

  const [toggleDark, setToggleDark] = useState('');


  useEffect(() => {
    if (token && !userInfo.id) {
      fetchUserInfo(token);
    }
  }, [token])

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
      element: <ArticlePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/post/create",
      element: <NewArticlePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/post/edit/:id",
      element: <EditArticlePage />,
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
