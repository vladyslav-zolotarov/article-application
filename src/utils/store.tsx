import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'
import { getArticlePosts, getMe, getOneArticlePost } from '../api/endpoints';
import { IPost } from '../types/types';

interface ArticleState {
    activeArticleId: string;
    article: {};
    setActiveArticleId: (activeArticleId: string) => void;
}

interface ArticleListState {
    articles: IPost[];
    loading: boolean;
    error: unknown;
    fetchArticles: () => void;
    deleteArticle: (id: string) => void;
}

interface DarkModeState {
    darkMode: boolean;
    setDarkMode: () => void;
}

interface UserState {
    token: string;
    userInfo: {
        id?: string;
        fullName: string;
        email: string;
        avatarUrl?: string;
        createdAt?: string;
        passwordHash: string;
        updatedAt?: string;
    };
    loading: boolean;
    error: unknown;
    fetchUserInfo: (token: string) => void;
    setToken: (token: string) => void;
    deleteToken: () => void;
}

export const useArticleStore = create<ArticleState>()(
    devtools(
        persist((set) => ({
            activeArticleId: '',
            article: {},
            setActiveArticleId: (activeArticleId) => set((state) => ({ ...state, activeArticleId })),
        }), { name: "activeArticleId" })
    )
)

export const useArticleListStore = create<ArticleListState>()(
    devtools(
        persist((set) => ({
            articles: [],
            loading: false,
            error: null,
            fetchArticles: async () => {
                set({ loading: true })

                try {
                    const response = await getArticlePosts();
                    set({ articles: response.data, error: null })
                } catch (err) {
                    set({ error: err })
                }
                finally {
                    set({ loading: false })
                }
            },
            deleteArticle: (id) => set((state) => ({ articles: state.articles.filter(e => e._id !== id) })),
        }), { name: "articles" })
    )
)

export const useDarkModeStore = create<DarkModeState>()(
    devtools(
        persist((set) => ({
            darkMode: false,
            setDarkMode: () => (set((state) => ({ darkMode: !state.darkMode }))),
        }), { name: "dark" })
    )
)

export const useUserStore = create<UserState>()(
    devtools(
        persist((set) => ({
            token: '',
            userInfo: {
                id: '',
                fullName: '',
                email: '',
                avatarUrl: '',
                createdAt: '',
                passwordHash: '',
                updatedAt: '',
            },
            loading: false,
            error: null,
            fetchUserInfo: async (token) => {
                set({ loading: true })

                try {
                    const response = await getMe(token);
                    set({ userInfo: response.data, error: null })
                } catch (err) {
                    set({ error: err })
                }
                finally {
                    set({ loading: false })
                }
            },
            setToken: (token) => (set(() => ({ token: token }))),
            deleteToken: () => (set(() => ({
                token: '', userInfo: {
                    id: '',
                    fullName: '',
                    email: '',
                    avatarUrl: '',
                    createdAt: '',
                    passwordHash: '',
                    updatedAt: '',
                }
            }))),
        }), { name: "userInfo" })
    )
)