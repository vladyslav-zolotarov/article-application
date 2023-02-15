import { IPost, IUser, IUserLogin, IUserRegister } from '../types/types';
import { api } from './axios';


export const getArticlePosts = async () => {
    return await api.get<IPost[]>('/posts')
}

export const getOneArticlePost = async (id: string) => {
    return await api.get<IPost>(`/posts/${id}`)
}

export const addNewArticle = async (data: {}, token: string) => {
    return await api.post<IPost>('/posts', data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const removeOneArticlePost = async (id: string, token: string) => {
    return await api.delete(`/posts/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
} 

export const updateOneArticlePost = async (id: string, token: string) => {
    return await api.patch(`/posts/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
} 

export const onLogin = async (data: {}) => {
    return await api.post<IUserLogin>('/auth/login', data);
}

export const onRegistration = async (data: {}) => {
    return await api.post<IUserRegister>('/auth/register', data);
}

export const getMe = async (token: string) => {
    return await api.get<IUser>('/auth/me', {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

// export const uploadImg = async (data: any, token: string) => {
//     return await api.post('/upload', data, {
//         headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "multipart/form-data"
//         }
//     })
// }



// app.delete('/posts/:id', checkAuth, PostController.remove);
// app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);