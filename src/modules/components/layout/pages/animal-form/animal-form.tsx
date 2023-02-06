import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { INewAnimal } from '../../../../../model/animal';
import { defaultAnimal } from '../../../../../utils/animal.utils';

export const AnimalForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { isValid, errors },
    } = useForm({
        mode: 'onChange',
        defaultValues: defaultAnimal,
    });

    const watchImage = watch('imgUrl');
    const watchType = watch('type');

    useEffect(() => {
        console.log(watchType);
    }, [watchType])

    const onSubmit = (data: INewAnimal) => {
        console.log(data);
    }

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
                        id='breed'
                        {...register('description', {
                            required: { value: true, message: 'Field Required' },
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
                                required: { value: false, message: 'Field Required' }
                            })}
                        />
                </div>

                <div className='row'>
                    {watchImage && (
                        <img className='preview-image' src={watchImage} />
                    )}
                </div><br/>

                <button disabled={!isValid} onClick={handleSubmit(onSubmit)}>Send</button>
            </form>
        </div>
    );
}