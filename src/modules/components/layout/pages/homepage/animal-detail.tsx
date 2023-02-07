import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../../../../../model/animal";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../../../contants";
import { Link } from "react-router-dom";

type TAnimalState = {
    loading: boolean;
    error: boolean;
    animal: IAnimal | null;
}

export const AnimalDetail = () => {

    const params = useParams();
    const id = params._id;

    const [animalState, setAnimalState] = useState<TAnimalState>({
        loading: false,
        error: false,
        animal: null
    });

    const fetchAnimal = async () => {
        setAnimalState({
            ...animalState,
            loading: true,
        });

        try {
            const res = await axios.get(`${API_URL}/${id}`);
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

    return (
        <div className={"animal-detail"}>
            {animalState.loading && 'Loading...'}
            {animalState.error && 'Error'}
            {animalState.animal && <><img src={animalState.animal.imgUrl} alt='animal photo' />
            <h2>{"ID: " + animalState.animal._id}</h2>
            <h2>{"Name: " + animalState.animal.name}</h2>
            <h2>{"Type: " + animalState.animal.type}</h2>
            <h2>{"Breed: " + animalState.animal.breed}</h2>
            <h2>{"Birth Date: " + animalState.animal.birthDate}</h2>
            <h2>{"Description: " + animalState.animal.description}</h2>
            <h2>{"Pedigree: " + animalState.animal.pedigree}</h2>
            <h2>{"Created At: " + animalState.animal.created_at}</h2>
            <h2>{"Updated At: " + animalState.animal.updated_at}</h2>
            <Link to={`/animal/${animalState.animal._id}/edit`}>Edit</Link></>}
        </div>
    );
}