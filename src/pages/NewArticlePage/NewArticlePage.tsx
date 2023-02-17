import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { addNewArticle } from '../../api/endpoints';
import { IPost } from '../../types/types';
import { useArticleStore, useUserStore } from '../../utils/store';

const NewArticlePage: FC = () => {
    let navigate = useNavigate();
    const { handleSubmit, register, formState: { errors, isValid } } = useForm<IPost>({ mode: "onChange" });

    const { token } = useUserStore((state) => ({
        token: state.token,
    }), shallow);

    const [isLoaded, setIsLoaded] = useState(false);


    const onSubmit = async (data: {}) => {
        if (data && token) {
            setIsLoaded(true);

            try {
                const response = await addNewArticle(data, token);
                
                if(response) {
                    navigate(`/post/${response.data._id}`);
                }
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoaded(false);
            }
        }
    }

    return (
        <div className='new_article_page__container'>
            <h1 className='mb-6 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Adding new article post</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='image_input pb-7'>
                    <span className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Article image:</span>

                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" 
                            // onChange={handleFileUploaded}
                             />
                        </label>
                    </div>
                </div>

                <div className='title_input pb-7'>
                    <label htmlFor="title" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Title: *</label>

                    <input id='title' type="text" aria-describedby="helper-text-title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write article title here..."
                        {...register("title", {
                            required: "This field is required. Please enter title!",
                            minLength: { value: 3, message: "The title must be at least 3 characters long." },
                        })} />
                    {errors?.title &&
                        <p id="helper-text-title" className="absolute mt-2 text-xs text-red-600 dark:text-red-500">{errors.title.message}</p>
                    }
                </div>

                <div className='text_input pb-7'>
                    <label htmlFor="text" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Text: *</label>
                    <textarea id="text" rows={6} aria-describedby="helper-text-text" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write article text here..."
                        {...register("text", {
                            required: "This field is required. Please enter text!",
                            minLength: { value: 3, message: "The text must be at least 3 characters long." },
                        })} />
                    {errors?.text &&
                        <p id="helper-text-text" className="absolute mt-2 text-xs text-red-600 dark:text-red-500">{errors.text.message}</p>
                    }
                </div>

                <div className='tags_input pb-7'>
                    <label htmlFor="tags" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Tags: </label>

                    <input id='tags' type="text" aria-describedby="helper-text-tags" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input tags..."
                        {...register("tags")} />
                </div>

                <button disabled={isValid ? false : true} type='submit' className="py-2.5 px-5 mr-2 mt-8 w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center justify-center">
                    {isLoaded &&
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                    }
                    Create new post
                </button>
            </form>
        </div>
    );
};

export default NewArticlePage;