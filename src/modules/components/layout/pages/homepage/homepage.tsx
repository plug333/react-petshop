import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../../../../../contants';
import { IAnimal } from '../../../../../model/animal';
import { TAnimalsState } from '../../../../../model/animal-state';
import { AnimalCard } from './animal-card';

export const Homepage = () => {
    const [animalState, setAnimalState] = useState<TAnimalsState>({
        loading: false,
        error: false,
        animals: null
    });

    const fetchAnimal = async () => {
        setAnimalState({
            ...animalState,
            loading: true,
        });

        try {
            const res = await axios.get(`${API_URL}/animal`);
            const data: IAnimal[] = res.data;
            console.log(data)
            setAnimalState({
                ...animalState,
                animals: data,
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

    return (
        <div className='animals'>
            <h1 className='animals-title'>Animals</h1>
            <div className='animals-list'>
                {animalState.loading && 'Loading...'}
                {animalState.error && 'Error'}
                {animalState.animals?.length === 0 && 'Animals not found'}
                {animalState.animals?.map(animal => (
                    <AnimalCard key={animal._id} animal={animal} />
                ))}
            </div>
        </div>
    )
}