import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'
import { getArticlePosts, getMe, getOneArticlePost } from '../api/endpoints';
import { IPost, IUser } from '../types/types';

interface ArticleState {
    articles: IPost[];
    fetchAllArticles: () => void;
    deleteArticle: (id: string) => void;
    loading: boolean;
    error: unknown;
}

interface DarkModeState {
    darkMode: boolean;
    setDarkMode: () => void;
}

interface UserState {
    token: string;
    userInfo: IUser;
    loading: boolean;
    error: unknown;
    fetchUserInfo: (token: string) => void;
    setToken: (token: string) => void;
    deleteToken: () => void;
}

export const useArticleStore = create<ArticleState>()(
    devtools(
        persist((set) => ({
            articles: [],
            fetchAllArticles: async () => {
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

            loading: false,
            error: null,
        }), { name: "articleStore" })
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
                token: '', 
                userInfo: {
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