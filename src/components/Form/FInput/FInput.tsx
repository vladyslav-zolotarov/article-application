import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface FormInputProps {
    label: string,
    id: string,
    type: string,
    ariaDescribedby: string,
    placeholder: string,
    inputRegister: {},
    register: UseFormRegister<any>,
    isError?: any,
    errorMessage?: string,
}

const FInput = ({ label, id, type, ariaDescribedby, placeholder, inputRegister, register, isError, errorMessage }: FormInputProps) => {
    return (
        <>
            <label htmlFor={id} className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">{label}</label>
            <input id={id} type={type}
                aria-describedby={ariaDescribedby}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
                {...register(`${id}`, inputRegister)}
            />
            {isError &&
                <p id={`helper-text-${id}`} className="absolute mt-2 text-xs text-red-600 dark:text-red-500">{errorMessage}</p>
            }
        </>
    );
};

export default FInput;