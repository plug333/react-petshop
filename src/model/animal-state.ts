import { IAnimal } from "./animal";

export type TAnimalState = {
    error: boolean;
    loading: boolean;
    animal: IAnimal | null;
}

export type TAnimalsState = {
    loading: boolean;
    error: boolean;
    animals: IAnimal[] | null;
}

export type TAnimalDeleteState = {
    deleting: boolean;
    error: boolean;
    confirmButton: boolean;
}