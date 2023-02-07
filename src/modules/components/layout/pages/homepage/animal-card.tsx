import { IAnimal } from "../../../../../model/animal";
import { Link } from "react-router-dom";

type Props = {
    animal: IAnimal;
}

export const AnimalCard = (props: Props) => {
    const { animal } = props;

    return (
        <div className={"animal-card "}>
            <div className="preview">
                <img src={animal.imgUrl} alt='animal photo' />
                <h2>{"Name: " + animal.name}</h2>
                <h2>{"Type: " + animal.type}</h2>
                <h2>{"Breed: " + animal.breed}</h2>
                <h2>{"Birth Date: " + animal.birthDate}</h2>
                <h2>{"Pedigree: " + animal.pedigree}</h2>
                <Link to={`/animal/${animal._id}`}>Details</Link>
            </div>
        </div>
    )
}