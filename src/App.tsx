import React, { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ArticlePage from "./pages/ArticlePage/ArticlePage";
import { useApplicationStore, useUserStore } from "./utils/store";
import { shallow } from "zustand/shallow";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Header from "./templates/Header/Header";
import UserPage from "./pages/UserPage/UserPage";
import NewArticlePage from "./pages/NewArticlePage/NewArticlePage";
import EditArticlePage from "./pages/EditArticlePage/EditArticlePage";
import MyArticlesListPage from "./pages/MyArticlesListPage/MyArticlesListPage";
import Footer from "./templates/Footer/Footer";
import { useColorMode } from "./hooks/useColorMode";

function App() {
  const { colorMode } = useColorMode();

  const { token, fetchUserInfo, user } = useUserStore(
    (state) => ({
      token: state.token,
      fetchUserInfo: state.fetchUser,
      user: state.user,
      deleteToken: state.deleteToken,
    }),
    shallow
  );

  useEffect(() => {
    if (token && user._id === "") {
      try {
        fetchUserInfo(token);
      } catch (e) {
        console.log(e);
      }
    }
  }, [token]);

  return (
    <div className={`App flex flex-col min-h-screen ${colorMode}`}>
      <BrowserRouter>
        <Header className="header-super-class" />
        <div className="flex-1 text-slate-900 dark:text-slate-300 bg-gray-100 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto py-7">
            <Routes>
              <Route
                path="/"
                element={<HomePage />}
                errorElement={<ErrorPage />}
              />
              <Route
                path={"/auth/register"}
                element={<RegisterPage />}
                errorElement={<ErrorPage />}
              />
              <Route
                path={"/auth/login"}
                element={<LoginPage />}
                errorElement={<ErrorPage />}
              />

              <Route
                path={"/auth/me"}
                element={<UserPage />}
                errorElement={<ErrorPage />}
              />
              <Route
                path={"/post/:id"}
                element={<ArticlePage />}
                errorElement={<ErrorPage />}
              />

              <Route
                path={"/posts/my"}
                element={<MyArticlesListPage />}
                errorElement={<ErrorPage />}
              />
              <Route
                path={"/post/create"}
                element={<NewArticlePage />}
                errorElement={<ErrorPage />}
              />
              <Route
                path={"/post/edit/:id"}
                element={<EditArticlePage />}
                errorElement={<ErrorPage />}
              />
            </Routes>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
