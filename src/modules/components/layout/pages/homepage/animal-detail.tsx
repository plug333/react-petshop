import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IAnimal } from "../../../../../model/animal";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../../../contants";
import { DeleteButton } from "../../../button/delete-button";
import { TAnimalState } from "../../../../../model/animal-state";

export const AnimalDetail = () => {
    const navigate = useNavigate();

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

    return (
        <div className={"animal-detail"}>
            {animalState.loading && 'Loading...'}
            {animalState.error && 'Error'}
            {animalState.animal && <>
                <h2>ID: {animalState.animal?._id}</h2>

                <label className="row-detail">
                    <img src={animalState.animal?.imgUrl} alt='animal photo' />
                </label>

                <label className="row-detail">
                    <h2>Name: {animalState.animal?.name}</h2>
                </label>

                <label className="row-detail">
                    <h2>Type: {animalState.animal?.type}</h2>
                </label>
                
                <label className="row-detail">
                    <h2>Breed: {animalState.animal?.breed}</h2>
                </label>

                <label className="row-detail">
                    <h2>Birth Date: {animalState.animal?.birthDate}</h2>
                </label>

                <label className="row-detail">
                    <h2>Description: {animalState.animal?.description}</h2>
                </label>

                <label className="row-detail">
                    <h2>{"Pedigree: " + animalState.animal?.pedigree}</h2>
                </label>

                <label className="row-detail">
                    <h2>Created At: {animalState.animal?.created_at}</h2>
                </label>

                <label className="row-detail">
                    <h2>Updated At: {animalState.animal?.updated_at}</h2>
                </label>

                <div className="row-detail">
                    <button disabled={animalState.loading} onClick={() => navigate(`/animal/${animalState.animal?._id}/edit`)}>Edit</button>
                    <DeleteButton />
            </div>
            </>}
        </div>
    );
}