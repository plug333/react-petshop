import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IAnimal } from "../../../../../model/animal";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../../../contants";

type TAnimalState = {
    loading: boolean;
    error: boolean;
    animal: IAnimal | null;
}

type TAnimalDeleteState = {
    deleting: boolean;
    error: boolean;
}

export const AnimalDetail = () => {
    const navigate = useNavigate();

    const params = useParams();
    const id = params._id;

    const [animalState, setAnimalState] = useState<TAnimalState>({
        loading: false,
        error: false,
        animal: null
    });
    const [animalDeleteState, setAnimalDeleteState] = useState<TAnimalDeleteState>({
        deleting: false,
        error: false
    });

    const fetchAnimal = async () => {
        setAnimalState({
            ...animalState,
            loading: true,
        });

        try {
            const res = await axios.get(`${API_URL}/animal/${id}`);
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

    const deleteAnimal = async () => {
        setAnimalDeleteState({
            ...animalDeleteState,
            deleting: true,
        });

        try {
            await axios.delete(`${API_URL}/animal/${id}`);
            setAnimalDeleteState({
                ...animalDeleteState,
                deleting: true,
            });
            navigate('/');
        } catch (e) {
            setAnimalDeleteState({
                deleting: false,
                error: true
            });
        }
    }

    return (
        <div className={"animal-detail"}>
            {animalState.loading && 'Loading...'}
            {animalState.error && 'Error'}
            {animalDeleteState.deleting && 'Deleting...'}
            {animalState.animal && <><img src={animalState.animal?.imgUrl} alt='animal photo' />
            <h2>{"ID: " + animalState.animal?._id}</h2>
            <h2>{"Name: " + animalState.animal?.name}</h2>
            <h2>{"Type: " + animalState.animal?.type}</h2>
            <h2>{"Breed: " + animalState.animal?.breed}</h2>
            <h2>{"Birth Date: " + animalState.animal?.birthDate}</h2>
            <h2>{"Description: " + animalState.animal?.description}</h2>
            <h2>{"Pedigree: " + animalState.animal?.pedigree}</h2>
            <h2>{"Created At: " + animalState.animal?.created_at}</h2>
            <h2>{"Updated At: " + animalState.animal?.updated_at}</h2>
            <button disabled={animalState.loading && animalDeleteState.deleting} onClick={() => navigate(`/animal/${animalState.animal?._id}/edit`)}>Edit</button>
            <button disabled={animalState.loading && animalDeleteState.deleting} onClick={() => deleteAnimal()}>Delete</button></>}
        </div>
    );
}