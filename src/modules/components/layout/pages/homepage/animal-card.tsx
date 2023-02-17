import { IAnimal } from "../../../../../model/animal";
import { useNavigate } from "react-router-dom";
import { DeleteButton } from "../../../button/delete-button";

type Props = {
    animal: IAnimal;
}

export const AnimalCard = (props: Props) => {
    const { animal } = props;

    const navigate = useNavigate();

    const calcAge = () => {
        const yearOfBirth = new Date(animal.birthDate).getFullYear();
        const currentYear = new Date().getFullYear();
        return currentYear - yearOfBirth;
    }

    return (
        <div className="animal-card">
            <div className="preview">
                <img src={animal.imgUrl} alt='animal photo' />
                <h2>Name: </h2><p>{animal.name}</p>
                <h2>Type: </h2><p>{animal.type}</p>
                <h2>Breed: </h2><p>{animal.breed}</p>
                <h2>Age: </h2><p>{calcAge()}</p>
                <h2>Pedigree: </h2> <p>{animal.pedigree ? 'true' : 'false'}</p>
                <button onClick={() => navigate(`/animal/${animal._id}`)}>Details</button>
                <DeleteButton />
            </div>
        </div>
    )
}