import axios from 'axios';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { INewAnimal } from '../../../../../model/animal';
import { defaultAnimal } from '../../../../../utils/animal.utils';
import { API_URL } from '../../../../../contants';
import { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";

export const AnimalForm = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { isValid, errors },
    } = useForm({
        mode: 'onChange',
        defaultValues: defaultAnimal,
    });

    const [animalState, setAnimalState] = useState({
        saving: false,
        error: false,
        success: false
    })

    const onSubmit = async (data: INewAnimal) => {
        setAnimalState({
            ...animalState,
            saving: true
        });

        try {
            const res = await axios.post(`${API_URL}`, data);
            setAnimalState({
                ...animalState,
                saving: false,
                success: true
            });
            const id = res.data._id;
            navigate(`/animal/${id}`);
        } catch (e) {
            setAnimalState({
                ...animalState,
                saving: false,
                error: true
            });
        }
    }

    const watchImage = watch('imgUrl');

    const now = dayjs().format('YYYY-MM-DD');

    return (
        <div className='animal-form'>
            <h1>Add new Animal</h1>

            <form>
                <div className='row'>
                    <label htmlFor='name'>Insert name:  </label>
                    <input
                        id='name'
                        {...register('name', {
                            required: { value: true, message: 'Field Required' },
                        })}
                        placeholder='Name'
                    />
                    {errors.name && errors.name.message}
                </div><br/>

                <div className='row'>
                    <label htmlFor='type'>Insert type:  </label>
                    <input
                        type='radio'
                        id='DOG'
                        className='type'
                        value='DOG'
                        {...register('type', {
                            required: { value: true, message: 'Field Required' }
                        })}
                    />
                    <label htmlFor='DOG'>DOG</label>
                    <input
                        type='radio'
                        id='CAT'
                        className='type'
                        value='CAT'
                        {...register('type', {
                            required: { value: true, message: 'Field Required' }
                        })}
                    />
                    <label htmlFor='CAT'>CAT</label>
                    {errors.type && errors.type.message}
                </div><br/>

                <div className='row'>
                    <label htmlFor='breed'>Insert breed:  </label>
                    <input
                        id='breed'
                        {...register('breed', {
                            required: { value: true, message: 'Field Required' },
                        })}
                        placeholder='Breed'
                    />
                    {errors.breed && errors.breed.message}
                </div><br/>

                <div className='row'>
                <label htmlFor='birthDate'>Insert birthdate:  </label>
                    <input
                        id='birthDate'
                        type='date'
                        max={now}
                        {...register('birthDate', {
                            required: { value: true, message: 'Field Required' },
                        })}
                    />
                    {errors.birthDate && errors.birthDate.message}
                </div><br/>

                <div className='row'>
                <label htmlFor='imgUrl'>Insert image:  </label>
                    <input
                        id='imgUrl'
                        {...register('imgUrl', {
                            required: { value: true, message: 'Field Required' },
                        })}
                        placeholder='Image'
                    />
                    {errors.imgUrl && errors.imgUrl.message}
                </div><br/>

                <div className='row'>
                    <label htmlFor='description'>Insert description:  </label>
                    <input
                        id='description'
                        {...register('description', {
                            required: { value: true, message: 'Field Required' },
                            minLength: { value: 9, message: 'Min 10 char allowed'}
                        })}
                        placeholder='Description'
                    />
                    {errors.description && errors.description.message}
                </div><br/>

                <div className='row'>
                    <label htmlFor='pedigree'>Pedigree? </label>
                        <input
                            type='checkbox'
                            id='pedigree'
                            {...register('pedigree', {
                                required: { value: false, message: 'Field not Required' }
                            })}
                        />
                </div>

                <div className='row'>
                    {watchImage && (
                        <img className='preview-image' src={watchImage} />
                    )}
                </div><br/>

                <button disabled={!isValid} onClick={handleSubmit(onSubmit)}>Send</button>
                {animalState.saving && "Saving"}
                {animalState.error && "Error"}
            </form>
        </div>
    );
}