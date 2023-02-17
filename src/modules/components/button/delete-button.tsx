import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../contants";
import { useNavigate } from "react-router-dom";
import { TAnimalDeleteState } from "../../../model/animal-state";
import { IAnimal } from "../../../model/animal";

type Props = {
    animal: IAnimal
}

export const DeleteButton = (props: Props) => {
    const { animal } = props;
    
    const navigate = useNavigate();

    const [animalDeleteState, setAnimalDeleteState] = useState<TAnimalDeleteState>({
        deleting: false,
        error: false,
        confirmButton: false
    });

    const refresh = () => window.location.reload();
    
    const deleteAnimal = async () => {     
        setAnimalDeleteState({
            ...animalDeleteState,
            deleting: true,
        });
        try {
            await axios.delete(`${API_URL}/animal/${animal._id}`);
            setAnimalDeleteState({
                ...animalDeleteState,
                deleting: false,
            });
            alert('Pet successfully deleted!');
            navigate('/');
            refresh();
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