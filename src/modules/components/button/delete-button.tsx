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
        error: false,
        confirmButton: false
    });
    
    const deleteAnimal = async () => {     
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
                ...animalDeleteState,
                deleting: false,
                error: true
            });
        }
    }
    return (
        <div>
            {animalDeleteState.deleting && 'Deleting...'}
            {!animalDeleteState.confirmButton && <>
                <button disabled={animalDeleteState.deleting} onClick={() => {
                    setAnimalDeleteState({
                        ...animalDeleteState,
                        confirmButton: true
                    });
                }}>Delete</button>
            </>}
            {animalDeleteState.confirmButton && <>
                <p>Are you sure you want to delete this animal?</p>
                <button onClick={() => deleteAnimal()}>Confirm</button>
                <button onClick={() => {
                    navigate('/');
                    setAnimalDeleteState({
                        ...animalDeleteState,
                        confirmButton: false
                    });
                    alert('Pet has not been deleted!');
                }}>Cancel</button>
            </>}
        </div>
    );
}