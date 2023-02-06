export interface IAnimalResponse {
    limit: number;
    skip: 0;
    total: number;
    animals: IAnimal[];
}

export interface INewAnimal {
    name: string | null;
    type: 'DOG' | 'CAT' | null;
    breed: string | null;
    birthDate: string | null;
    imgUrl: string | null;
    description: string | null;
    pedigree: boolean | null;
}

export interface IAnimal extends INewAnimal{
    _id: string;
    created_at: string;
    updated_at: string;
}