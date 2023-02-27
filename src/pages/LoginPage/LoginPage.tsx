import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { onLogin } from '../../api/endpoints';
import { useNavigate } from "react-router-dom";
import { useUserStore } from '../../utils/store';
import { shallow } from 'zustand/shallow';
import { IUserLogin } from '../../types/types';
import FInput from '../../components/Form/FInput/FInput';
import FButton from '../../components/Form/FButton/FButton';

const LoginPage: FC = () => {
    let navigate = useNavigate();

    const { handleSubmit, register, formState: { errors, isValid } } = useForm<IUserLogin>({ mode: "onChange" });
    const { token, setToken } = useUserStore((state) => ({
        token: state.token,
        setToken: state.setToken,
    }), shallow);

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [])

    const onSubmit = async (data: {}) => {
        try {
            console.log(data)
            const response = await onLogin(data);
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
        <div className="login_page__container">
            <form className='py-9 max-w-sm mx-auto flex flex-col justify-center align-center' onSubmit={handleSubmit(onSubmit)}>
                <h1 className='mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>Login page</h1>

                <div className='email_input pb-7'>
                    <FInput
                        label="Input e-mail"
                        id='email'
                        type="email"
                        ariaDescribedby="helper-text-email"
                        placeholder='name@gmail.com'
                        register={register}
                        inputRegister={{
                            required: "This field is required. Please enter your email!",
                            pattern: { value: /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, message: "Invalid email." }
                        }}
                        isError={errors?.email}
                        errorMessage={errors?.email?.message}
                    />
                </div>

                <div className='password_input pb-7'>
                    <FInput
                        label="Input your password"
                        id="password"
                        type="password"
                        ariaDescribedby="helper-text-password"
                        placeholder="Your password"
                        register={register}
                        inputRegister={{
                            required: "This field is required. Please enter your password!",
                            minLength: { value: 5, message: "The password must be at least 5 characters long." },
                        }}
                        isError={errors?.password}
                        errorMessage={errors?.password?.message}
                    />
                </div>

                <FButton
                    text={'Login'}
                    handle={handleClickSubmitForm}
                    isLoaded={isLoaded}
                    isValid={isValid}
                />
            </form>
        </div>
    );
};

export default LoginPage;