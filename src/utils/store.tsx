import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'

interface ArticleState {
    activeArticleId: string;
    setActiveArticleId: (activeArticleId: string) => void;
}

// interface ArticleListState {
//     ArticleList: [];
//     setArticleList: (ArticleList: []) => void;
// }

export const useArticleStore = create<ArticleState>()(
    devtools(
        (set) => ({
            activeArticleId: '',
            setActiveArticleId: (activeArticleId) => set((state) => ({ ...state, activeArticleId })),
        })
    )
)

// export const useArticleListStore = create<ArticleListState>()(
//     devtools(
//         (set) => ({
//             ArticleList: [],
//             setArticleList: (ArticleList) => set((state) => ({ ...state, ArticleList })),
//         })
//     )
// )
