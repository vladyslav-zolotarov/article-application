import { IPosts } from '../types/types';
import { api } from './axios';


export const getArticlePosts = async () => {
    return await api.get<[]>('/posts')
}

export const getOneArticlePost = async (id: string) => {
    return await api.get<IPosts>(`/posts/${id}`)
}


// export const onLogin = async (data) => {
//     return await api.post('/auth/login', data);
// }

// export const onRegistration = async (data) => {
//     return await api.post('/auth/register', data);
// }

// export const addNewArticlePosts = async (data, token) => {
//     return await api.post('/posts', data, {
//         headers: {
//             "Authorization": `Bearer ${token}`
//         }
//     })
// }