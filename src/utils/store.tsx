import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'
import { getArticlePosts, getMe, getOneArticlePost } from '../api/endpoints';
import { IPost, IUser } from '../types/types';

interface ArticleState {
    articles: IPost[];
    fetchAllArticles: () => void;
    deleteArticle: (id: string) => void;

    myArticlesList: IPost[];
    setMyArticlesList: (userId: string) => void;
    clearMyActircleList: () => void;

    loading: boolean;
    error: unknown;
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


            myArticlesList: [],
            setMyArticlesList: (userId) => set((state) => ({ myArticlesList: state.articles.filter(e => e.user._id === userId) })),
            clearMyActircleList: () => set({myArticlesList: []}),

            loading: false,
            error: null,
        }), { name: "articleStore" })
    )
)


interface ApplicationState {
    darkMode: boolean;
    setDarkMode: () => void;
}

export const useApplicationStore = create<ApplicationState>()(
    devtools(
        persist((set) => ({
            darkMode: false,
            setDarkMode: () => (set((state) => ({ darkMode: !state.darkMode }))),
        }), { name: "applicationStore" })
    )
)


interface UserState {
    token: string;
    user: IUser;
    loading: boolean;
    error: unknown;
    fetchUser: (token: string) => void;
    setToken: (token: string) => void;
    deleteToken: () => void;
}

export const useUserStore = create<UserState>()(
    devtools(
        persist((set) => ({
            token: '',
            user: {
                _id: '',
                fullName: '',
                email: '',
                avatarUrl: '',
                createdAt: '',
                passwordHash: '',
                updatedAt: '',
            },
            loading: false,
            error: null,
            fetchUser: async (token) => {
                set({ loading: true })

                try {
                    const response = await getMe(token);
                    set({ user: response.data, error: null })
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
                user: {
                    _id: '',
                    fullName: '',
                    email: '',
                    avatarUrl: '',
                    createdAt: '',
                    passwordHash: '',
                    updatedAt: '',
                }
            }))),
        }), { name: "userStore" })
    )
)