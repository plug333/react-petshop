export interface IAnimalResponse {
    limit: number;
    skip: 0;
    total: number;
    animals: IAnimal[];
}

export interface INewAnimal {
    name: string;
    type: 'DOG' | 'CAT' | "";
    breed: string;
    birthDate: string;
    imgUrl: string;
    description: string;
    pedigree: boolean;
}

export interface IAnimal extends INewAnimal{
    _id: string;
    created_at: string;
    updated_at: string;
}