import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { onRegistration } from '../../api/endpoints';
import { useNavigate } from "react-router-dom";
import { useUserStore } from '../../utils/store';
import { shallow } from 'zustand/shallow';

type FormData = {
    fullName: string;
    email: string;
    password: string;
};

const RegisterPage: FC = () => {
    let navigate = useNavigate();
    const { handleSubmit, control, register, reset, formState: { errors, isValid } } = useForm<FormData>({ mode: "onChange" });
    const [isLoaded, setIsLoaded] = useState(false);

    const { token, setToken } = useUserStore((state) => ({
        token: state.token,
        setToken: state.setToken,
    }), shallow);

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [])

    const onSubmit = async (data: {}) => {
        try {
            const response = await onRegistration(data);
            setIsLoaded(false);
            if ('token' in response.data) {
                setToken(response.data.token);
                navigate('/');
            }
        }
        catch (e) {
            setIsLoaded(false);
            console.log(e);
        }
    }

    const handleClickSubmitForm = () => {
        setIsLoaded(true);
    }

    return (
        <div className='register__page_container'>
            <form className='py-9 max-w-sm mx-auto flex flex-col justify-center align-center' onSubmit={handleSubmit(onSubmit)}>
                <h1 className='mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Register page</h1>

                <div className='full_name_input pb-7'>
                    <label htmlFor="full_name" className="block text-lg mb-2 font-medium text-gray-900 dark:text-white">Input full name</label>
                    <input id="full_name" type="text" aria-describedby="helper-text-full_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Your name'
                        {...register("fullName", {
                            required: "This field is required. Please enter your name!",
                            minLength: { value: 3, message: "The name must be at least 3 characters long." },
                        })} />

                    {errors?.fullName &&
                        <p id="helper-text-full_name" className="absolute mt-2 text-xs text-red-600 dark:text-red-500">{errors.fullName.message}</p>
                    }
                </div>

                <div className='email_input pb-7'>
                    <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Input e-mail</label>

                    <input id='email' type="email" aria-describedby="helper-text-email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com"
                        {...register("email", {
                            required: "This field is required. Please enter your email!",
                            pattern: { value: /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, message: "Invalid email." }
                        })} />
                    {errors?.email &&
                        <p id="helper-text-email" className="absolute mt-2 text-xs text-red-600 dark:text-red-500">{errors.email.message}</p>
                    }
                </div>

                <div className='password_input pb-7'>
                    <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Input your password</label>

                    <input id='password' type="password" aria-describedby="helper-text-password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your password"
                        {...register("password", {
                            required: "This field is required. Please enter your password!",
                            minLength: { value: 5, message: "The password must be at least 5 characters long." },
                        })} />
                    {errors?.password &&
                        <p id="helper-text-password" className="absolute mt-2 text-xs text-red-600 dark:text-red-500">{errors.password.message}</p>
                    }
                </div>

                <button onClick={handleClickSubmitForm} disabled={isValid ? false : true} type='submit' className="py-2.5 px-5 mr-2 mt-8 w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center justify-center">
                    {isLoaded &&
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                    }
                    Create account
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;