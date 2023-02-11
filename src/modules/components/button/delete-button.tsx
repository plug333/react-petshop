import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../contants";
import { useNavigate, useParams } from "react-router-dom";
import { TAnimalDeleteState } from "../../../model/animal-state";

export const DeleteButton = () => {
    const navigate = useNavigate();

    const params = useParams();
    const id = params._id;
    
    const [animalDeleteState, setAnimalDeleteState] = useState<TAnimalDeleteState>({
        deleting: false,
        error: false
    });
    
    const deleteAnimal = async () => {
        const confirm = prompt('Are you sure you want to delete this animal? Type "yes" if you want to delete it');

        if (confirm === 'yes') {
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
                alert('Pet successfully deleted!');
                navigate('/');
            } catch (e) {
                setAnimalDeleteState({
                    deleting: false,
                    error: true
                });
            }
        } else {
            alert('Pet deletion successfully deleted!');
            navigate('/');
        }
    }
    return (
        <div>
            {animalDeleteState.deleting && 'Deleting...'}
            <button disabled={animalDeleteState.deleting} onClick={() => deleteAnimal()}>Delete</button>
        </div>
    );
}