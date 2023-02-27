import React, { useEffect, useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import { useApplicationStore, useUserStore } from './utils/store';
import { shallow } from 'zustand/shallow';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Header from './templates/Header/Header';
import UserPage from './pages/UserPage/UserPage';
import NewArticlePage from './pages/NewArticlePage/NewArticlePage';
import EditArticlePage from './pages/EditArticlePage/EditArticlePage';
import MyArticlesListPage from './pages/MyArticlesListPage/MyArticlesListPage';
import Footer from './templates/Footer/Footer';

function App() {
  const { darkMode } = useApplicationStore((state) => ({
    darkMode: state.darkMode,
  }), shallow);

  const { token, fetchUserInfo, user } = useUserStore((state) => ({
    token: state.token,
    fetchUserInfo: state.fetchUser,
    user: state.user,
    deleteToken: state.deleteToken,
  }), shallow);

  const [toggleDark, setToggleDark] = useState('');


  useEffect(() => {
    if (token && user._id === "") {
      try {
        fetchUserInfo(token);
      } catch (e) {
        console.log(e)
      }
    }
  }, [token])

  useEffect(() => {
    if (darkMode) {
      setToggleDark('dark');
    } else {
      setToggleDark('light');
    }
  }, [darkMode])

  return (
    <div className={`App flex flex-col min-h-screen ${toggleDark}`}>
      <BrowserRouter>
        <Header />
        <div className='flex-1 text-slate-900 dark:text-slate-300 bg-gray-100 dark:bg-slate-900'>
          <div className='max-w-7xl mx-auto py-7'>
            <Routes>
              <Route path="/"
                element={<HomePage />}
                errorElement={<ErrorPage />}>
              </Route>
              <Route path={"/auth/register"}
                element={<RegisterPage />}
                errorElement={<ErrorPage />}>
              </Route>
              <Route path={"/auth/login"}
                element={<LoginPage />}
                errorElement={<ErrorPage />}>
              </Route>

              <Route path={"/auth/me"}
                element={<UserPage />}
                errorElement={<ErrorPage />}>
              </Route>
              <Route path={"/post/:id"}
                element={<ArticlePage />}
                errorElement={<ErrorPage />}>
              </Route>

              <Route path={"/posts/my"}
                element={<MyArticlesListPage />}
                errorElement={<ErrorPage />}>
              </Route>
              <Route path={"/post/create"}
                element={<NewArticlePage />}
                errorElement={<ErrorPage />}>
              </Route>
              <Route path={"/post/edit/:id"}
                element={<EditArticlePage />}
                errorElement={<ErrorPage />}>
              </Route>
            </Routes>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
