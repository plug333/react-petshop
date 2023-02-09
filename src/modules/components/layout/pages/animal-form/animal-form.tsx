import axios from 'axios';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { INewAnimal } from '../../../../../model/animal';
import { defaultAnimal } from '../../../../../utils/animal.utils';
import { API_URL } from '../../../../../contants';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { IAnimal } from '../../../../../model/animal';

type TAnimalState = {
    error: boolean;
    loading: boolean;
    animal: IAnimal | null;
}

export const AnimalForm = () => {
    const navigate = useNavigate();

    const params = useParams();
    const _id = params._id;

    const [animalState, setAnimalState] = useState<TAnimalState>({
        error: false,
        loading: false,
        animal: null
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { isValid, errors },
    } = useForm({
        mode: 'onChange',
        defaultValues: defaultAnimal,
    });

    const fetchAnimal = async () => {
        setAnimalState({
            ...animalState,
            loading: true,
        });

        try {
            const res = await axios.get(`${API_URL}/animal/${_id}`);
            const data: IAnimal = res.data;
            setAnimalState({
                ...animalState,
                animal: data,
                loading: false
            });
        } catch (e) {
            setAnimalState({
                ...animalState,
                loading: false,
                error: true,
            });
        }
    }

    useEffect(() => {
        fetchAnimal();
    }, []);

    const onSubmit = async (data: INewAnimal) => {
        setAnimalState({
            ...animalState,
            loading: true
        });

        try {
            const res = defaultAnimal ? await axios.post(`${API_URL}/animal`, data) : await axios.put(`${API_URL}/animal/${_id}`, data);
            setAnimalState({
                ...animalState,
                loading: false,
            });
            const id = res.data._id;
            navigate(`/animal/${id}`);
        } catch (e) {
            setAnimalState({
                ...animalState,
                loading: false,
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
                        value={animalState.animal?.name}
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
                        value={animalState.animal?.breed}
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
                        value={animalState.animal?.birthDate}
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
                        value={animalState.animal?.imgUrl}
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
                        value={animalState.animal?.description}
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

                {!animalState.loading && <><button disabled={!isValid} onClick={handleSubmit(onSubmit)}>Send</button></>}
                {animalState.error && "Error"}
            </form>
        </div>
    );
}