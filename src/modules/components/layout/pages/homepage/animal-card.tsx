import { IAnimal } from "../../../../../model/animal";

type Props = {
    animal: IAnimal;
}

export const AnimalCard = (props: Props) => {
    const { animal } = props;

    const calcAge = () => {
        const yearOfBirth = new Date(animal.birthDate).getFullYear();
        const currentYear = new Date().getFullYear();
        return currentYear - yearOfBirth;
    }

    return (
        <div className={"animal-card "}>
            <div className="preview">
                <h2>{"Name: " + animal.name}</h2>
                <h2>{"Type: " + animal.type}</h2>
                <h2>{"Breed: " + animal.breed}</h2>
                <h2>{"Birth Date: " + animal.birthDate}</h2>
                <h2>{"Age: " + calcAge()}</h2>
                <h2>{"Created at: " + animal.created_at}</h2>
                <h2>{"Updated at: " + animal.updated_at}</h2>
            </div>
        </div>
    )
}